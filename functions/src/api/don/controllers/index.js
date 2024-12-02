const Don = require('../../../classes/don');
const db = require('../../../config/firebase');

class DonController {
    constructor() {
      this.collection = db.collection('dons');
    }
    async create(req, res) {
      try {
        const don = new Don(req.body);
        const data = await this.collection.add(don.toJSON());
        return res.status(201).json({
          status: true,
          data: { id: data.id, ...don.toJSON() },
        });
      } catch (error) {
        return res.status(500).json({
          message: 'Erreur lors de la création du don',
          status: false,
          error: error.message,
        });
      }
    }
    async getAll(req, res) {
      try {
        const donsCollection = await this.collection.get();
        const data = donsCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        return res.status(200).json({
          status: true,
          data,
        });
      } catch (error) {
        return res.status(500).json({
          status: false,
          message: 'Erreur lors de la récupération des dons',
          error: error.message,
        });
      }
    }
    async getById(req, res) {
      try {
        const don = await this.collection.doc(req.params.id).get();
        if (!don.exists) return res.status(404).json({ message: 'Don non trouvé' });
        return res.status(200).json({
          status: true,
          data: { id: don.id, ...don.data() },
        });
      } catch (error) {
        return res.status(500).json({
          message: 'Erreur lors de la récupération du don',
          status: false,
          error: error.message,
        });
      }
    }
    async update(req, res) {
      try {
        const donRef = this.collection.doc(req.params.id);
        const doc = await donRef.get();
        if (!doc.exists) {
          return res.status(404).json({
            status: false,
            message: 'Don non trouvé',
          });
        }
        await donRef.update({
          ...req.body,
          updatedAt: new Date()
        });
        const updatedDon = await donRef.get();
        return res.status(200).json({
          status: true,
          data: updatedDon.data(),
        });
      } catch (error) {
        return res.status(500).json({
          message: 'Erreur lors de la mise à jour du don',
          status: false,
          error: error.message,
        });
      }
    }
    async delete(req, res) {
      try {
        const donRef = this.collection.doc(req.params.id);
        const doc = await donRef.get();
        if (!doc.exists) {
          return res.status(404).json({
            message: 'Don non trouvé',
            status: false,
          });
        }
        await donRef.delete();
        return res.status(200).json({
          message: 'Don supprimé avec succès',
          status: true,
        });
      } catch (error) {
        return res.status(500).json({
          message: 'Erreur lors de la suppression du don',
          status: false,
          error: error.message,
        });
      }
    }
  }
  module.exports = new DonController();