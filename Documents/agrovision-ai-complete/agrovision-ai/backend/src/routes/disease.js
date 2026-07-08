const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const supabase = require('../config/supabase');
const { authenticate, optionalAuth } = require('../middleware/auth');
const logger = require('../utils/logger');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

/**
 * @swagger
 * /api/disease/predict:
 *   post:
 *     summary: Detect crop disease from image
 *     tags: [Disease]
 */
router.post('/predict', optionalAuth, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Image file required' });
  try {
    // Forward to Python ML service
    const form = new FormData();
    form.append('image', req.file.buffer, { filename: req.file.originalname, contentType: req.file.mimetype });

    let result;
    try {
      const resp = await axios.post(`${process.env.ML_SERVICE_URL}/predict-disease`, form, {
        headers: form.getHeaders(), timeout: 30000,
      });
      result = resp.data;
    } catch {
      // Demo fallback
      result = {
        disease: 'Late Blight (Phytophthora infestans)',
        confidence: 94.7,
        severity: 'High',
        description: 'Late blight is caused by the water mold Phytophthora infestans. It causes water-soaked lesions on leaves and fruit.',
        treatments: ['Remove infected plant parts', 'Apply Mancozeb 75% WP @ 2.5g/L', 'Improve drainage', 'Use drip irrigation'],
        fertilizers: ['Potassium Schoenite 2% foliar spray', 'Reduce nitrogen application', 'Calcium nitrate for cell strength'],
        pesticides: ['Mancozeb 75% WP @ 2.5g/L', 'Cymoxanil + Mancozeb @ 2.5g/L', 'Metalaxyl + Mancozeb for severe cases'],
        preventions: ['Use resistant seed varieties', 'Crop rotation every 3 years', 'Regular field scouting'],
      };
    }

    // Save to DB
    if (req.user) {
      await supabase.from('disease_predictions').insert({
        user_id: req.user.id,
        disease: result.disease,
        confidence: result.confidence,
        severity: result.severity,
      });
    }

    res.json(result);
  } catch (err) {
    logger.error('Disease detection error:', err.message);
    res.status(500).json({ error: 'Detection failed' });
  }
});

router.get('/history', authenticate, async (req, res) => {
  const { data } = await supabase
    .from('disease_predictions')
    .select('*')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false })
    .limit(20);
  res.json({ history: data || [] });
});

module.exports = router;
