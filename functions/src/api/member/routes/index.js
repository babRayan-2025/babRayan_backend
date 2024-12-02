const router = require('express').Router();
const membersController = require('../controllers');

router.post('/', membersController.create.bind(membersController));
router.get('/', membersController.getAll.bind(membersController));
router.get('/:id', membersController.getById.bind(membersController));
router.put('/:id', membersController.update.bind(membersController));
router.delete('/:id', membersController.delete.bind(membersController));

module.exports = router;