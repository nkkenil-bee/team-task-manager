const express = require('express');
const authRoutes = require('./auth');
const projectRoutes = require('./project');
const taskRoutes = require('./task');
const dashboardRoutes = require('./dashboard');
const userRoutes = require('./user');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/users', userRoutes);

module.exports = router;
