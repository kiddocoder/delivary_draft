// NotificationComponent.js

import React, { useEffect, useState } from 'react';
import WebSocket from 'ws';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notification, index) => (
        <div key={index}>
          {notification.type === 'delivery-update' && (
            <p>Mise à jour de livraison pour la commande {notification.deliveryId}: {notification.message}</p>
          )}
          {/* Ajouter d'autres types de notifications ici */}
        </div>
      ))}
    </div>
  );
};

export default NotificationComponent;