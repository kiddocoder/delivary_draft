// notificationController.js;

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Fonction pour envoyer des notifications
const sendNotification = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

// Notification pour une mise à jour de livraison;
const notifyDeliveryUpdate = (deliveryId, message) => {
  sendNotification({ type: 'delivery-update', deliveryId, message });
};

module.exports = { notifyDeliveryUpdate };
