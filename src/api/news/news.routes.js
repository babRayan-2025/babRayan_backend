const router = require('express').Router();
const newsController = require('./newsController');

router.post('/', newsController.create.bind(newsController));
router.get('/', newsController.getAll.bind(newsController));
router.get('/:id', newsController.getById.bind(newsController));
router.put('/:id', newsController.update.bind(newsController));
router.delete('/:id', newsController.delete.bind(newsController));

module.exports = router;