const express = require('express');
const axios = require('axios');
const router = express.Router();
const supabase = require('../config/supabase');
const { optionalAuth } = require('../middleware/auth');
const logger = require('../utils/logger');

const SYSTEM_PROMPT = `You are AgroVision AI, an expert agricultural advisor for Indian farmers.
You help with:
- Crop disease diagnosis and treatment
- Crop selection and soil recommendations
- Government schemes (PM-Kisan, PMFBY, MNREGS, Kisan Credit Card)
- Weather-based farming decisions
- Fertilizer, pesticide and irrigation guidance
- Organic farming techniques
- Market prices and selling strategies

Be concise, practical and empathetic. Use simple language suitable for farmers.
When recommending treatments, specify brand names available in India.
Always mention government subsidy options when relevant.
Respond in the same language the user writes in.`;

async function callGemini(messages) {
  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_KEY) throw new Error('No Gemini key');

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const resp = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
    {
      contents,
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    }
  );
  return resp.data.candidates[0].content.parts[0].text;
}

async function callFallback(lastMessage) {
  const msg = lastMessage.toLowerCase();
  if (msg.includes('blight') || msg.includes('disease') || msg.includes('spot'))
    return '🌿 **Disease Management**:\n\nFor fungal diseases, apply Mancozeb 75% WP @ 2.5g/L water. Remove infected plant parts immediately. Improve air circulation by proper spacing. Use copper-based fungicides as a preventive measure.\n\nFor viral diseases, control vector insects (aphids, whiteflies) using imidacloprid @ 0.3ml/L.\n\nWould you like specific treatment for a particular crop?';
  if (msg.includes('pm-kisan') || msg.includes('scheme') || msg.includes('subsidy'))
    return '💰 **Government Schemes for Farmers**:\n\n1. **PM-Kisan**: ₹6,000/year in 3 installments. Apply at pmkisan.gov.in\n2. **PMFBY**: Crop insurance at 2% premium for Kharif crops\n3. **Kisan Credit Card**: Low-interest loan up to ₹3 lakh at 7% interest\n4. **PM-KUSUM**: Solar pump subsidy up to 90%\n\nWhich scheme would you like details about?';
  if (msg.includes('fertilizer') || msg.includes('npk') || msg.includes('urea'))
    return '🌱 **Fertilizer Recommendation Guide**:\n\nFor most crops:\n- Nitrogen (N): Apply in split doses — 50% at sowing, 25% at tillering, 25% at flowering\n- Phosphorus (P): Apply full dose at sowing as basal\n- Potassium (K): Apply as basal dose\n\n**Soil test recommended** before application. Contact your nearest KVK (Krishi Vigyan Kendra) for free soil testing.';
  if (msg.includes('rain') || msg.includes('weather') || msg.includes('irrigation'))
    return '🌧 **Smart Irrigation Advisory**:\n\nWith unpredictable monsoon, I recommend:\n1. Install soil moisture sensors for data-driven irrigation\n2. Use drip irrigation — saves 40-60% water\n3. Check our Weather Dashboard for 7-day LSTM rain forecast\n4. Irrigate in morning hours to reduce evaporation\n\nGovt subsidy available for drip/sprinkler systems under PMKSY.';
  return '🌾 I can help you with crop diseases, soil recommendations, government schemes, weather advice, and more. Please describe your farming problem in detail and I\'ll provide specific guidance!';
}

/**
 * @swagger
 * /api/chatbot:
 *   post:
 *     summary: Send a message to the AI farming assistant
 *     tags: [Chatbot]
 */
router.post('/', optionalAuth, async (req, res) => {
  const { messages, language = 'English' } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array required' });
  }

  try {
    let reply;
    try {
      reply = await callGemini(messages);
    } catch (geminiErr) {
      logger.warn('Gemini unavailable, using fallback:', geminiErr.message);
      reply = await callFallback(messages[messages.length - 1]?.content || '');
    }

    // Save chat history if user is authenticated
    if (req.user) {
      const lastUser = messages[messages.length - 1];
      await supabase.from('chatbot_history').insert([
        { user_id: req.user.id, role: 'user', content: lastUser.content },
        { user_id: req.user.id, role: 'assistant', content: reply },
      ]);
    }

    res.json({ reply, language });
  } catch (err) {
    logger.error('Chatbot error:', err.message);
    res.status(500).json({ error: 'Chatbot service unavailable' });
  }
});

router.get('/history', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' });
  const { data } = await supabase
    .from('chatbot_history')
    .select('*')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: true })
    .limit(100);
  res.json({ history: data || [] });
});

module.exports = router;
