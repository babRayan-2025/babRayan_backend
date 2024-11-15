const router = require('express').Router();
const AuthController = require('./authController');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/verify_email', AuthController.verifyEmail);

module.exports = router;
