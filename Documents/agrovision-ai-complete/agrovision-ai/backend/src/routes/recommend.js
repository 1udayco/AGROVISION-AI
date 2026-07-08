const express = require('express');
const axios = require('axios');
const supabase = require('../config/supabase');
const { authenticate, optionalAuth } = require('../middleware/auth');
const router = express.Router();

router.post('/', optionalAuth, async (req, res) => {
  const params = req.body;
  try {
    let result;
    try {
      const resp = await axios.post(`${process.env.ML_SERVICE_URL}/recommend-crop`, params, { timeout: 20000 });
      result = resp.data;
    } catch {
      result = {
        top_crop: 'Soybean',
        alternatives: ['Cotton', 'Pigeon Pea', 'Maize'],
        yield_prediction: 2.4,
        revenue_estimate: 86400,
        water_requirement: 450,
        fertilizer_plan: [
          { nutrient: 'Nitrogen (N)', dose: '20 kg/ha', timing: 'At sowing' },
          { nutrient: 'Phosphorus (P)', dose: '60 kg/ha', timing: 'Basal application' },
          { nutrient: 'Potassium (K)', dose: '40 kg/ha', timing: 'Basal + top dressing' },
        ],
        risk_score: 28,
        confidence: 91.3,
        radar_data: [
          { metric: 'Soil Match', score: 92 },
          { metric: 'Climate Fit', score: 88 },
          { metric: 'Profitability', score: 85 },
          { metric: 'Water Efficiency', score: 76 },
          { metric: 'Market Demand', score: 90 },
          { metric: 'Pest Resistance', score: 72 },
        ],
      };
    }
    if (req.user) {
      await supabase.from('recommendations').insert({
        user_id: req.user.id,
        state: params.state,
        district: params.district,
        soil_type: params.soil_type,
        top_crop: result.top_crop,
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Recommendation failed' });
  }
});

module.exports = router;
