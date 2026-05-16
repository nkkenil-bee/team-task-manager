const express = require('express');
const { signup, login } = require('../controllers/auth');
const { validate, signupSchema, loginSchema } = require('../middleware/validate');

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

module.exports = router;
