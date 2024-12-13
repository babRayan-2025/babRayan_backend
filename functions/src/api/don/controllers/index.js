const Don = require('../../../classes/don');
const db = require('../../../config/firebase');
const crypto = require('crypto');
const paypal = require('@paypal/checkout-server-sdk');

const axios = require('axios');







const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);



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

    async initiatePayment(req, res) {
      try {
          const { montant, userId } = req.body;

          const orderId = crypto.randomBytes(16).toString('hex'); // ID unique
          const paymentRequest = {
              merchantId: process.env.CMI_MERCHANT_ID,
              accessKey: process.env.CMI_ACCESS_KEY,
              amount: montant,
              currency: process.env.CMI_CURRENCY,
              orderId,
              returnUrl: process.env.CMI_RETURN_URL,
          };

          const queryString = Object.entries(paymentRequest)
              .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
              .join('&');
          const paymentUrl = `https://cmi-payments-gateway.com/pay?${queryString}`;

          const don = new Don({
              userId,
              montant,
              status: 'pending',
              transactionId: null,
          });
          await this.collection.doc(orderId).set(don.toJSON());

          return res.status(200).json({ paymentUrl });
      } catch (error) {
          console.error('Erreur lors de l\'initialisation du paiement :', error);
          return res.status(500).json({ message: 'Erreur lors de l\'initialisation du paiement' });
      }
  }

  



  async handleCallback(req, res) {
      try {
          const { orderId, status, transactionId } = req.body;

          const donRef = this.collection.doc(orderId);
          const donDoc = await donRef.get();

          if (!donDoc.exists) {
              return res.status(404).json({ message: 'Don introuvable' });
          }

          const updatedData = {
              status: status === 'SUCCESS' ? 'paid' : 'failed',
              transactionId,
              updatedAt: new Date(),
          };

          await donRef.update(updatedData);

          return res.status(200).json({ message: 'Statut du don mis à jour', status: updatedData.status });
      } catch (error) {
          console.error('Erreur lors du traitement du callback CMI :', error);
          return res.status(500).json({ message: 'Erreur lors du traitement du callback' });
      }
  }

    async generateAccessToken() {
      const response = await axios({
          url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
          method: 'post',
          data: 'grant_type=client_credentials',
          auth: {
              username: process.env.PAYPAL_CLIENT_ID,
              password: process.env.PAYPAL_SECRET
          }
      });

      return response.data.access_token;
  }

  async createOrder(req, res) {
      try {
        const { montant, userId } = req.body;
          const accessToken = await this.generateAccessToken();

          const response = await axios({
              url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
              method: 'post',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + accessToken
              },
              data: {
                  intent: 'CAPTURE',
                  purchase_units: [
                      {
                        amount: {
                              currency_code: 'USD',
                              value: montant ,
                          }
                      }
                  ],
                  application_context: {
                    return_url: `${process.env.BASE_URL}complete-order`,
                    cancel_url: process.env.BASE_URL + '/cancel-order',
                    shipping_preference: 'NO_SHIPPING',
                    user_action: 'PAY_NOW',
                    brand_name: 'BabRayane'
                }
              }
          });
        

          const approvalUrl = response.data.links.find(link => link.rel === 'approve').href;

          const orderId = response.data.id;

        // Créez l'objet Don avec la validation des champs
        const don = new Don({
            userId,
            montant,
            status: 'pending',
            transactionId: null,
            typeDon: 'monthly',
            donateurAnonyme: true,  // Valeur par défaut pour typeDon
            paymentMethod: "paypal",
            createdAt: new Date(),
        });

        await this.collection.doc(orderId).set(don.toJSON());
        
        return res.status(200).json({ approvalUrl });
          
      } catch (error) {
          return res.status(500).json({
              message: 'Erreur lors de la création de la commande PayPal',
              error: error.message,
          });
      }
  }

  async capturePayment(req, res) {
    try {
        const token = req.query.token;  // Récupérer le token depuis la query string
        if (!token) {
            return res.status(400).json({
                message: 'Token manquant dans la requête',
            });
        }

        const accessToken = await this.generateAccessToken();
        console.log('Capturing payment with token:', token);

        // Appel de l'API PayPal pour capturer le paiement
        const response = await axios({
            url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${token}/capture`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // Vous pouvez aussi mettre à jour l'état du don dans Firestore ici
        const orderId = response.data.id;
        const don = await this.collection.doc(orderId).get();
        if (don.exists) {
            don.ref.update({ status: 'completed', transactionId: response.data.purchase_units[0].payments.captures[0].id });
        }

        return res.status(200).json({
            message: 'Paiement capturé avec succès',
            data: response.data,
        });
    } catch (error) {
        console.error('Erreur lors de la capture du paiement:', error);
        return res.status(500).json({
            message: 'Erreur lors de la capture du paiement',
            error: error.message,
        });
    }
}


  

}
  module.exports = new DonController();