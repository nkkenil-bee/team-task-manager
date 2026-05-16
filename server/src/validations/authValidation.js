const { z } = require('zod');

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

module.exports = {
  signupSchema,
  loginSchema,
};
