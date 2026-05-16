const prisma = require('../utils/prisma');

const getStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let totalTasks, completedTasks, pendingTasks, overdueTasks;
    const today = new Date();

    if (role === 'ADMIN') {
      const projects = await prisma.project.findMany({
        where: { adminId: userId },
        select: { id: true },
      });
      const projectIds = projects.map((p) => p.id);

      totalTasks = await prisma.task.count({ where: { projectId: { in: projectIds } } });
      completedTasks = await prisma.task.count({ where: { projectId: { in: projectIds }, status: 'COMPLETED' } });
      pendingTasks = await prisma.task.count({ where: { projectId: { in: projectIds }, status: { in: ['PENDING', 'IN_PROGRESS'] } } });
      overdueTasks = await prisma.task.count({
        where: {
          projectId: { in: projectIds },
          status: { not: 'COMPLETED' },
          dueDate: { lt: today },
        },
      });
    } else {
      totalTasks = await prisma.task.count({ where: { assigneeId: userId } });
      completedTasks = await prisma.task.count({ where: { assigneeId: userId, status: 'COMPLETED' } });
      pendingTasks = await prisma.task.count({ where: { assigneeId: userId, status: { in: ['PENDING', 'IN_PROGRESS'] } } });
      overdueTasks = await prisma.task.count({
        where: {
          assigneeId: userId,
          status: { not: 'COMPLETED' },
          dueDate: { lt: today },
        },
      });
    }

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
};
