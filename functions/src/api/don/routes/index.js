const router = require('express').Router();
const donController = require('../controllers');

router.post('/', donController.create.bind(donController));
router.get('/', donController.getAll.bind(donController));
router.get('/:id', donController.getById.bind(donController));
router.put('/:id', donController.update.bind(donController));
router.delete('/:id', donController.delete.bind(donController));
module.exports = router;