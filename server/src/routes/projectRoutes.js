const express = require('express');
const { createProject, getProjects, getProjectById, addMemberToProject } = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { createProjectSchema, addMemberSchema } = require('../validations/projectValidation');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', roleMiddleware(['ADMIN']), validate(createProjectSchema), createProject);
router.post('/:id/members', roleMiddleware(['ADMIN']), validate(addMemberSchema), addMemberToProject);

module.exports = router;
