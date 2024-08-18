// DeliveryTracking.js

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DeliveryTracking = ({ deliveryId }) => {
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  useEffect(() => {
    const fetchDeliveryLocation = async () => {
      try {
        const response = await fetch(`/api/delivery/${deliveryId}/location`);
        const data = await response.json();
        setDeliveryLocation(data.location);
      } catch (error) {
        console.error('Erreur lors du chargement de la position de livraison:', error);
      }
    };

    const interval = setInterval(fetchDeliveryLocation, 60000); // Rafraîchit toutes les minutes
    fetchDeliveryLocation(); // Charge la position initiale

    return () => clearInterval(interval);
  }, [deliveryId]);

  return (
    <div>
      <h2>Suivi en Temps Réel de la Livraison</h2>
      {deliveryLocation && (
        <MapContainer center={[deliveryLocation.latitude, deliveryLocation.longitude]} zoom={13} style={{ height: '400px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[deliveryLocation.latitude, deliveryLocation.longitude]}>
            <Popup>Position Actuelle de la Livraison</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default DeliveryTracking;