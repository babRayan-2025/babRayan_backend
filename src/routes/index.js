const router = require('express').Router();
const userRoutes = require('../api/Users/user.routes');
const newsRoutes = require('../api/news/news.routes');
const donRoutes = require('../api/don/don.routes');
const authRoutes = require('../api/auth/auth.routes');
const membersRoutes = require('../api/members/members.routes');

router.use('/users', userRoutes);
router.use('/news', newsRoutes);
router.use('/don', donRoutes);
router.use('/auth', authRoutes);
router.use('/members', membersRoutes);

module.exports = router;