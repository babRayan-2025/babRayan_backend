const router = require('express').Router();
const userRoutes = require('../api/Users/user.routes');
const newsRoutes = require('../api/news/news.routes');
const donRoutes = require('../api/don/don.routes');

router.use('/users', userRoutes);
router.use('/news', newsRoutes);
router.use('/don', donRoutes);

module.exports = router;