const router = require("express").Router();
const AuthController = require("../controllers");

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/verify_email', AuthController.verifyEmail);



module.exports = router;