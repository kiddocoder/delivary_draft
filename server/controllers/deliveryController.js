// deliveryController.js;

const updateDeliveryLocation = async (req, res) => {
      try {
        const { deliveryId } = req.params;
        const { latitude, longitude } = req.body;

        const delivery = await Delivery.findById(deliveryId);
        if (!delivery) {
          return res.status(404).json({ message: 'Livraison non trouvée' });
        }

        delivery.currentLocation = { latitude, longitude };
        await delivery.save();

        res.status(200).json({ message: 'Position de livraison mise à jour avec succès' });
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la position de livraison:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    };