const { z } = require('zod');

const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    projectId: z.string().uuid(),
    assigneeId: z.string().uuid(),
  }),
});

const updateTaskStatusSchema = z.object({
  body: z.object({
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  }),
});

module.exports = {
  createTaskSchema,
  updateTaskStatusSchema,
};
