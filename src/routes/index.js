const router = require('express').Router();
const userRoutes = require('../api/Users/user.routes');
const newsRoutes = require('../api/news/news.routes');
const donRoutes = require('../api/don/don.routes');
const authRoutes = require('../api/auth/auth.routes');

router.use('/users', userRoutes);
router.use('/news', newsRoutes);
router.use('/don', donRoutes);
router.use('/auth', authRoutes);

module.exports = router;