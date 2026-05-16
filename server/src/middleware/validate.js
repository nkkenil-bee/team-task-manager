const { z } = require('zod');

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.errors.map((e) => ({
        path: e.path,
        message: e.message,
      })),
    });
  }
};

// Schemas
const signupSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
    role: z.enum(['ADMIN', 'MEMBER']).optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

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
  validate,
  signupSchema,
  loginSchema,
  createProjectSchema,
  addMemberSchema,
  createTaskSchema,
  updateTaskStatusSchema,
};
