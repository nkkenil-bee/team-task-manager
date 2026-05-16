const express = require('express');
const { getStats } = require('../controllers/dashboard');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/stats', getStats);

module.exports = router;
