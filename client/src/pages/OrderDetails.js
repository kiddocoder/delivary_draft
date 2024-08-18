// OrderDetails.js

import React, { useState } from 'react';

const OrderDetails = ({ orderId }) => {
  const [optimizedRoute, setOptimizedRoute] = useState(null);

  const handleOptimizeRoute = async () => {
    try {
      const response = await fetch(`/api/order/${orderId}/optimize`);
      const data = await response.json();
      setOptimizedRoute(data.optimizedRoute);
    } catch (error) {
      console.error('Erreur lors de l\'optimisation de l\'itinéraire:', error);
    }
  };

  return (
    <div>
      <h2>Détails de la Commande</h2>
      <button onClick={handleOptimizeRoute}>Optimiser l'Itinéraire</button>
      {optimizedRoute && (
        <div>
          <h3>Itinéraire Optimisé pour Livraison</h3>
          <ul>
            {optimizedRoute.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;