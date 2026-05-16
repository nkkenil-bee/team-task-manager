const prisma = require('../utils/prisma');

const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: 'MEMBER' },
      select: { id: true, name: true, email: true },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
};
