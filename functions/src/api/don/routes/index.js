const router = require('express').Router();
const donController = require('../controllers');

router.post('/', donController.create.bind(donController));
router.get('/', donController.getAll.bind(donController));
router.get('/:id', donController.getById.bind(donController));
router.put('/:id', donController.update.bind(donController));
router.delete('/:id', donController.delete.bind(donController));
router.post('/pay', donController.initiatePayment.bind(donController));
router.post('/callback', donController.handleCallback.bind(donController));




// PayPal Payment Routes
router.post('/payment', donController.createOrder.bind(donController));
router.get('/complete-order/:token', donController.capturePayment.bind(donController));
router.get('/cancel-order', (req, res) => res.redirect('/'));




module.exports = router;
