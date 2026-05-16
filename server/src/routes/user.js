const express = require('express');
const { getMe, updateMe, getUsers, updateUserRole, deleteUser } = require('../controllers/user');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/me', getMe);
router.put('/me', updateMe);
router.get('/', getUsers);

// Admin only routes
router.put('/:id/role', roleMiddleware(['ADMIN']), updateUserRole);
router.delete('/:id', roleMiddleware(['ADMIN']), deleteUser);

module.exports = router;
