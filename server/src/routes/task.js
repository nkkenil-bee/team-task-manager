const express = require('express');
const { createTask, getTasks, updateTaskStatus, updateTask, deleteTask } = require('../controllers/task');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const { validate, createTaskSchema, updateTaskStatusSchema } = require('../middleware/validate');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', roleMiddleware(['ADMIN']), validate(createTaskSchema), createTask);
router.patch('/:id/status', validate(updateTaskStatusSchema), updateTaskStatus);
router.put('/:id', roleMiddleware(['ADMIN']), updateTask);
router.delete('/:id', roleMiddleware(['ADMIN']), deleteTask);

module.exports = router;
