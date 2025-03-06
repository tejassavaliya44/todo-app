import express from 'express';
const router = express.Router();
import signup from '../controllers/authentication/signup.js';
import login from '../controllers/authentication/login.js';
import * as validations from '../utils/validations.js';
import validator from '../middlewares/validator.js';

router.post('/signup', validator(validations.signUpValidation),
    async function _signup(req, res, next) {
        try {
            const data = await signup(req.body);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/login', validator(validations.loginValidation),
    async function _login(req, res, next) {
        try {
            const data = await login(req.body);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }
);

export default router;