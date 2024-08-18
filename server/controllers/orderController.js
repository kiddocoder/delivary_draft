// orderController.js;

import { GPT } from 'gpt-2-cloud';

const trackDelivery = async (req, res) => {
  try {
    // Fetch delivery details from database
    const deliveryDetails = await Delivery.findById(req.params.deliveryId);

    // Generate delivery update using GPT-2
    const gpt = new GPT({
      apiKey: process.env.GPT_API_KEY, // Replace with your GPT-2 API key
      models: 'gpt-2',
    });

    const prompt = `Delivery update for order ${deliveryDetails.orderId}: ${deliveryDetails.status}`;
    const response = await gpt.complete(prompt, { stop: ['\n'] });

    // Update delivery status in database
    deliveryDetails.statusUpdates.push(response.data.choices[0].text.trim());
    await deliveryDetails.save();

    res.status(200).json({ message: 'Delivery update generated and saved' });
  } catch (error) {
    console.error('Error generating delivery update:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const handleOrderClaim = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    // Vérifiez si l'ordre est toujours disponible
    if (!order || order.status !== 'pending') {
      return res.status(404).json({ message: 'Commande introuvable ou déjà réclamée' });
    }

    // Vérifiez si le délai d'attente de 10 minutes est écoulé
    const currentTime = new Date();
    const tenMinutesAgo = new Date(currentTime.getTime() - 10 * 60000);

    if (order.createdAt < tenMinutesAgo) {
      return res.status(400).json({ message: 'Délai d\'attente de 10 minutes écoulé' });
    }

    // Assigner la commande à un livreur
    order.status = 'assigned';
    order.deliveryAgent = req.user.userId; // Supposons que vous ayez déjà l'utilisateur dans le JWT

    await order.save();
    res.status(200).json({ message: 'Commande réclamée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la réclamation de la commande:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

const optimizeDeliveryRoute = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    // Intégration avec un service de planification d'itinéraires externe (ex: Google Maps)
    // Mock implementation
    const optimizedRoute = await optimizeRoute(order.addresses);

    res.status(200).json({ optimizedRoute });
  } catch (error) {
    console.error('Erreur lors de l\'optimisation de l\'itinéraire de livraison:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};


const handleReturnRequest = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason, details } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    if (order.status !== 'delivered') {
      return res.status(400).json({ message: 'La commande ne peut être retournée que si elle a été livrée' });
    }

    // Ajouter des détails du retour à l'ordre ou à une collection de retours
    order.returnDetails = { reason, details };
    order.status = 'return-requested';

    await order.save();

    res.status(200).json({ message: 'Demande de retour soumise avec succès' });
  } catch (error) {
    console.error('Erreur lors du traitement de la demande de retour:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};
