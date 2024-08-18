// Subscription.js
import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Subscription = () => {
  const [plan, setPlan] = useState('basic');

  const handleSubscription = async (token) => {
    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, plan }),
      });
      const data = await response.json();
      console.log(data); // Handle response appropriately
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  return (
    <div>
      <h2>Abonnement Mensuel</h2>
      <select value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option value="basic">Basic (5000 francs)</option>
        {/* Add more subscription plans here */}
      </select>
      <StripeCheckout
        token={handleSubscription}
        stripeKey="YOUR_STRIPE_PUBLIC_KEY" // Replace with your actual Stripe public key
      />
    </div>
  );
}

export default Subscription;