const express = require('express');
const { getUsers } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', roleMiddleware(['ADMIN']), getUsers);

module.exports = router;
