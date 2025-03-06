import { body, param } from 'express-validator';
import moment from 'moment';

export const signUpValidation = [
    body('username').trim().notEmpty().withMessage('username is required'),
    body('email').trim().notEmpty().isEmail().withMessage('email is required'),
    body('password').trim()
        .isLength({ min: 6, max: 15 })
        .withMessage('Password should be minimum 6 and maximum 15 characters long')
];

export const loginValidation = [
    body('username').trim().notEmpty().withMessage('username is required'),
    body('password').trim()
        .isLength({ min: 6, max: 15 })
        .withMessage('Password should be minimum 6 and maximum 15 characters long')
];

export const createToDoValidation = [
    body('title').trim().notEmpty().withMessage('title is required'),
    body('description').trim().notEmpty().withMessage('description is required'),
    body('due_date').trim().custom((date) => {
        const isValidDate = moment(date, 'YYYY-MM-DD', true).isValid();
        if (!isValidDate) {
            throw new Error('please enter valid due_date in "YYYY-MM-DD format!"');
        }
        return true;
    }),
    body('reminder_time').trim().custom((date) => {
        const isValidDate = moment(date).isValid();
        if (!isValidDate) {
            throw new Error('please enter valid reminder_time!"');
        }
        return true;
    })
];

export const updateToDoValidation = [
    param('todoId').trim().notEmpty().isMongoId().withMessage('please provide valid todoId param!'),
    body('title').optional().trim().notEmpty().withMessage('title is required'),
    body('description').optional().trim().notEmpty().withMessage('description is required'),
    body('due_date').optional().trim().custom((date) => {
        const isValidDate = moment(date, 'YYYY-MM-DD', true).isValid();
        if (!isValidDate) {
            throw new Error('please enter valid due_date in "YYYY-MM-DD format!');
        }
        return true;
    })
];

export const todoIdParamValidation = [
    param('todoId').trim().notEmpty().isMongoId().withMessage('please provide valid todoId param!')
];

export const todoListValidation = [
    body('due_date').trim().custom((date) => {
        const isValidDate = moment(date, 'YYYY-MM-DD', true).isValid();
        if (!isValidDate) {
            throw new Error('please enter valid due_date in "YYYY-MM-DD format!');
        }
        return true;
    })
];