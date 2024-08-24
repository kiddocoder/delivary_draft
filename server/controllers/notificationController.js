// notificationController.js;

import { Server, OPEN } from 'ws';
const wss = new Server({ port: 8080 });

// Fonction pour envoyer des notifications
const sendNotification = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

// Notification pour une mise à jour de livraison;
const notifyDeliveryUpdate = (deliveryId, message) => {
  sendNotification({ type: 'delivery-update', deliveryId, message });
};

export default { notifyDeliveryUpdate };
