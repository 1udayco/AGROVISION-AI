const cron = require('node-cron');
const axios = require('axios');
const supabase = require('../config/supabase');
const logger = require('../utils/logger');

function startCronJobs() {
  // Every hour: fetch weather for major Indian cities
  cron.schedule('0 * * * *', async () => {
    const cities = ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Nashik'];
    logger.info(`[CRON] Updating weather for ${cities.length} cities`);
    for (const city of cities) {
      try {
        await axios.get(`http://localhost:${process.env.PORT || 4000}/api/weather?city=${city}`);
      } catch (_) {}
    }
  });

  // Every day at 6 AM: generate disease risk report
  cron.schedule('0 6 * * *', async () => {
    logger.info('[CRON] Generating daily disease risk report');
    try {
      const { data: recentPredictions } = await supabase
        .from('disease_predictions')
        .select('disease, severity')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
      logger.info(`[CRON] Processed ${recentPredictions?.length || 0} disease predictions`);
    } catch (err) {
      logger.error('[CRON] Disease report error:', err.message);
    }
  });

  // Every 30 min: clean up expired sessions
  cron.schedule('*/30 * * * *', () => {
    logger.info('[CRON] Session cleanup tick');
  });

  logger.info('✅ Cron jobs started');
}

module.exports = { startCronJobs };
