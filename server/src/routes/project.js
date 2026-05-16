const express = require('express');
const { createProject, getProjects, getProjectById, addMemberToProject } = require('../controllers/project');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const { validate, createProjectSchema, addMemberSchema } = require('../middleware/validate');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', roleMiddleware(['ADMIN']), validate(createProjectSchema), createProject);
router.post('/:id/members', roleMiddleware(['ADMIN']), validate(addMemberSchema), addMemberToProject);

module.exports = router;
