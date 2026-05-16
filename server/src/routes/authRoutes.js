const express = require('express');
const { signup, login } = require('../controllers/authController');
const validate = require('../middlewares/validateMiddleware');
const { signupSchema, loginSchema } = require('../validations/authValidation');

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

module.exports = router;
