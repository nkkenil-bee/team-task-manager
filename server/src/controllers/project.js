const prisma = require('../utils/prisma');

const createProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const adminId = req.user.id;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        adminId,
        members: {
          connect: { id: adminId },
        },
      },
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let projects;
    if (role === 'ADMIN') {
      projects = await prisma.project.findMany({
        where: { adminId: userId },
        include: { _count: { select: { tasks: true, members: true } } },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      projects = await prisma.project.findMany({
        where: { members: { some: { id: userId } } },
        include: { _count: { select: { tasks: true, members: true } } },
        orderBy: { createdAt: 'desc' },
      });
    }

    res.json(projects);
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        members: { select: { id: true, name: true, email: true, role: true } },
        tasks: { include: { assignee: { select: { name: true } } }, orderBy: { createdAt: 'desc' } },
      },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
      },
    });

    res.json(project);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Prisma handles related tasks via onDelete: Cascade in the schema
    await prisma.project.delete({ where: { id } });
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const addMemberToProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        members: {
          connect: { id: userId },
        },
      },
    });

    res.json({ message: 'Member added successfully', project });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addMemberToProject,
};
