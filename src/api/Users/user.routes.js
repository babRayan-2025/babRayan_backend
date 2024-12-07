const router = require('express').Router();
const userController = require('./usersController');

router.post('/', userController.create.bind(userController));
router.get('/', userController.getAll.bind(userController));
router.get('/:id', userController.getById.bind(userController));
router.put('/:id', userController.update.bind(userController));
router.delete('/:id', userController.delete.bind(userController));

module.exports = router;