// ReturnRequestForm.js

import React, { useState } from 'react';

const ReturnRequestForm = ({ orderId }) => {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/order/${orderId}/return`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason, details }),
      });

      if (response.ok) {
        alert('Demande de retour soumise avec succès');
        // Redirection ou mise à jour de l'interface après la soumission
      } else {
        const data = await response.json();
        alert(`Erreur: ${data.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission de la demande de retour:', error);
      alert('Erreur lors de la soumission de la demande de retour');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Raison du Retour:</label>
      <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} required />

      <label>Détails du Retour:</label>
      <textarea value={details} onChange={(e) => setDetails(e.target.value)} required />

      <button type="submit">Soumettre la Demande de Retour</button>
    </form>
  );
};

export default ReturnRequestForm;
