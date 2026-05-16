const express = require('express');
const { getStats } = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/stats', getStats);

module.exports = router;
