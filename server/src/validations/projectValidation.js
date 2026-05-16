const { z } = require('zod');

const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    description: z.string().optional(),
  }),
});

const addMemberSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
  }),
});

module.exports = {
  createProjectSchema,
  addMemberSchema,
};
