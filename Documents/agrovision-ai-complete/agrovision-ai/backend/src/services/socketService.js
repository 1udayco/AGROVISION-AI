const logger = require('../utils/logger');

let activeUsers = 0;

function setupSocketIO(io) {
  io.on('connection', (socket) => {
    activeUsers++;
    logger.info(`Socket connected: ${socket.id} | Active: ${activeUsers}`);

    // Broadcast live analytics
    const analyticsInterval = setInterval(() => {
      socket.emit('analytics:update', {
        active_users: activeUsers + Math.floor(Math.random() * 100),
        detections_per_min: Math.floor(Math.random() * 15) + 5,
        api_response_ms: Math.floor(Math.random() * 50) + 80,
      });
    }, 5000);

    // Real-time disease alerts
    socket.on('subscribe:alerts', ({ region }) => {
      socket.join(`alerts:${region}`);
      logger.info(`User subscribed to alerts for: ${region}`);
    });

    // IoT sensor data stream
    socket.on('iot:subscribe', ({ farmId }) => {
      socket.join(`farm:${farmId}`);
      const sensorInterval = setInterval(() => {
        socket.emit('iot:data', {
          farmId,
          timestamp: new Date(),
          soil_moisture: (Math.random() * 30 + 40).toFixed(1),
          temperature: (Math.random() * 5 + 28).toFixed(1),
          humidity: (Math.random() * 20 + 55).toFixed(1),
          nitrogen: (Math.random() * 10 + 35).toFixed(1),
          ph: (Math.random() * 1 + 6).toFixed(2),
        });
      }, 3000);
      socket.on('disconnect', () => clearInterval(sensorInterval));
    });

    socket.on('disconnect', () => {
      activeUsers = Math.max(0, activeUsers - 1);
      clearInterval(analyticsInterval);
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });
}

function broadcastDiseaseAlert(io, region, alert) {
  io.to(`alerts:${region}`).emit('disease:alert', alert);
}

module.exports = { setupSocketIO, broadcastDiseaseAlert };
