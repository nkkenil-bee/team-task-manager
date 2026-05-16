const prisma = require('../utils/prisma');

const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, projectId, assigneeId } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        projectId,
        assigneeId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let tasks;
    if (role === 'ADMIN') {
      tasks = await prisma.task.findMany({
        include: { project: { select: { name: true } }, assignee: { select: { name: true } } },
      });
    } else {
      tasks = await prisma.task.findMany({
        where: { assigneeId: userId },
        include: { project: { select: { name: true } } },
      });
    }

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: { status },
    });

    res.json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status, assigneeId } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(status && { status }),
        ...(assigneeId && { assigneeId }),
      },
    });

    res.json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({ where: { id } });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
};
