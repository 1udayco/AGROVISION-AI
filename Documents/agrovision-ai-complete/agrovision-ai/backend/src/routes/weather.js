const express = require('express');
const axios = require('axios');
const router = express.Router();
const supabase = require('../config/supabase');
const logger = require('../utils/logger');

const OW_KEY = process.env.OPENWEATHER_API_KEY;

async function fetchOpenWeather(city) {
  const [currentResp, forecastResp] = await Promise.all([
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OW_KEY}&units=metric`),
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OW_KEY}&units=metric&cnt=56`),
  ]);
  return { current: currentResp.data, forecast: forecastResp.data };
}

function buildAiPredictions(forecast) {
  const dailyRain = [];
  const groups = {};
  forecast.list.forEach((item) => {
    const day = item.dt_txt.split(' ')[0];
    if (!groups[day]) groups[day] = [];
    groups[day].push(item);
  });
  Object.values(groups).slice(0, 7).forEach((group) => {
    const avgPop = group.reduce((s, i) => s + (i.pop || 0), 0) / group.length;
    dailyRain.push(Math.round(avgPop * 100));
  });
  const maxRain = Math.max(...dailyRain);
  return {
    rain_probability_7days: dailyRain,
    drought_risk: maxRain < 20 ? 'High' : maxRain < 40 ? 'Medium' : 'Low',
    flood_risk: maxRain > 70 ? 'High' : maxRain > 50 ? 'Medium' : 'Low',
    irrigation_advice: dailyRain.slice(0, 3).some((p) => p > 50)
      ? 'Skip irrigation for next 2–3 days — significant rainfall expected.'
      : 'Proceed with normal irrigation schedule.',
    crop_risk: maxRain > 65
      ? 'High humidity forecast increases disease pressure. Monitor crops closely.'
      : 'Weather conditions are favourable for crop growth.',
  };
}

/**
 * @swagger
 * /api/weather:
 *   get:
 *     summary: Get current weather and 7-day forecast with AI predictions
 *     tags: [Weather]
 */
router.get('/', async (req, res) => {
  const { city = 'Mumbai', lat, lon } = req.query;
  try {
    let raw;
    if (OW_KEY) {
      try { raw = await fetchOpenWeather(city); } catch (_) { raw = null; }
    }

    if (raw) {
      const { current: c, forecast: f } = raw;
      const daily = [];
      const dayMap = {};
      f.list.forEach((item) => {
        const d = new Date(item.dt * 1000).toLocaleDateString('en-IN', { weekday: 'short' });
        if (!dayMap[d]) { dayMap[d] = item; daily.push({ date: d, ...item }); }
      });

      const response = {
        current: {
          temp: Math.round(c.main.temp),
          feels_like: Math.round(c.main.feels_like),
          humidity: c.main.humidity,
          wind_speed: Math.round(c.wind.speed * 3.6),
          uv_index: 6,
          visibility: Math.round((c.visibility || 8000) / 1000),
          description: c.weather[0].description,
          city: c.name,
          country: c.sys.country,
        },
        forecast: daily.slice(0, 7).map((d) => ({
          date: d.date,
          max_temp: Math.round(d.main.temp_max),
          min_temp: Math.round(d.main.temp_min),
          rainfall: Math.round((d.rain?.['3h'] || 0) * 8),
          humidity: d.main.humidity,
          condition: d.weather[0].main === 'Rain' ? '🌧' : d.weather[0].main === 'Clouds' ? '⛅' : '☀️',
        })),
        ai_predictions: buildAiPredictions(f),
        hourly: f.list.slice(0, 24).map((item) => ({
          time: new Date(item.dt * 1000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          temp: Math.round(item.main.temp),
          rain: Math.round((item.rain?.['3h'] || 0) * 100) / 100,
        })),
      };

      // Log to Supabase
      supabase.from('weather_logs').insert({
        city: response.current.city,
        temperature: response.current.temp,
        humidity: response.current.humidity,
        rainfall: response.forecast[0]?.rainfall || 0,
      }).then(() => {});

      return res.json(response);
    }

    // Fallback demo data
    res.json({
      current: { temp: 31, feels_like: 35, humidity: 68, wind_speed: 12, uv_index: 7, visibility: 8.5, description: 'Partly Cloudy', city, country: 'IN' },
      forecast: ['Today','Tue','Wed','Thu','Fri','Sat','Sun'].map((d, i) => ({ date: d, max_temp: 30 + i % 3, min_temp: 22, rainfall: [2,15,28,8,0,0,5][i], humidity: 68, condition: ['⛅','🌧','🌩','🌦','☀️','☀️','🌤'][i] })),
      ai_predictions: { rain_probability_7days: [15,65,85,40,5,10,30], drought_risk: 'Low', flood_risk: 'Medium', irrigation_advice: 'Skip irrigation for next 3 days — 43mm predicted.', crop_risk: 'High humidity increases late blight risk for tomatoes.' },
      hourly: Array.from({ length: 24 }, (_, i) => ({ time: `${String(i).padStart(2,'0')}:00`, temp: 24 + Math.sin((i/24)*Math.PI*2)*6, rain: i>=14&&i<=18 ? Math.random()*3 : 0 })),
    });
  } catch (err) {
    logger.error('Weather fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;
