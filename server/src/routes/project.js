const express = require('express');
const { 
  createProject, 
  getProjects, 
  getProjectById, 
  updateProject, 
  deleteProject, 
  addMemberToProject 
} = require('../controllers/project');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const { validate, createProjectSchema } = require('../middleware/validate');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getProjects);
router.post('/', roleMiddleware(['ADMIN']), validate(createProjectSchema), createProject);
router.get('/:id', getProjectById);
router.put('/:id', roleMiddleware(['ADMIN']), updateProject);
router.delete('/:id', roleMiddleware(['ADMIN']), deleteProject);
router.post('/:id/members', roleMiddleware(['ADMIN']), addMemberToProject);

module.exports = router;
