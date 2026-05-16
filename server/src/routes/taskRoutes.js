const express = require('express');
const { createTask, getTasks, updateTaskStatus, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { createTaskSchema, updateTaskStatusSchema } = require('../validations/taskValidation');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', roleMiddleware(['ADMIN']), validate(createTaskSchema), createTask);
router.patch('/:id/status', validate(updateTaskStatusSchema), updateTaskStatus);
router.put('/:id', roleMiddleware(['ADMIN']), updateTask);
router.delete('/:id', roleMiddleware(['ADMIN']), deleteTask);

module.exports = router;
