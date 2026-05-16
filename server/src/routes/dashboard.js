const express = require('express');
const { getDashboardStats } = require('../controllers/dashboard');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/stats', getDashboardStats);

module.exports = router;
