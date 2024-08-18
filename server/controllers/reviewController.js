// reviewController.js

const createReview = async (req, res) => {
      try {
        const { orderId, rating, comment } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
          return res.status(404).json({ message: 'Commande non trouvée' });
        }

        const newReview = new Review({
          orderId,
          rating,
          comment,
          userId: req.user.id, // Exemple avec authentification utilisateur
        });

        await newReview.save();

        res.status(201).json({ message: 'Avis créé avec succès' });
      } catch (error) {
        console.error('Erreur lors de la création de l\'avis:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    };