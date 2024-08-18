// Orders.js;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryUpdate, setDeliveryUpdate] = useState('');

  const handleTrackDelivery = async (deliveryId) => {
    try {
      const response = await fetch(`/api/orders/${deliveryId}/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      console.log(data); // Handle response appropriately
    } catch (error) {
      console.error('Error tracking delivery:', error);
    }
  };

  return (
    <div>
      <h2>Liste des Commandes</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.description}
            <button onClick={() => handleTrackDelivery(order._id)}>Suivre la Livraison</button>
          </li>
        ))}
      </ul>
      <div>
        {deliveryUpdate && (
          <div>
            <h3>Dernière Mise à Jour de la Livraison</h3>
            <p>{deliveryUpdate}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;


