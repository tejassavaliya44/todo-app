import express from 'express';
const router = express.Router();
import * as validations from '../utils/validations.js';
import validator from '../middlewares/validator.js';
import create from '../controllers/to-do/create.js';
import get from '../controllers/to-do/get.js';
import remove from '../controllers/to-do/remove.js';
import update from '../controllers/to-do/update.js';
import list from '../controllers/to-do/list.js';
import STATUS from '../utils/constants.js';

router.post('/create', validator(validations.createToDoValidation),
    async function _createTodo(req, res, next) {
        try {
            const data = await create(req.authUser.userId, req.body);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:todoId', validator(validations.todoIdParamValidation),
    async function _getTodo(req, res, next) {
        try {
            const data = await get(req.params.todoId, req.authUser.userId);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:todoId', validator(validations.updateToDoValidation),
    async function _updateTodo(req, res, next) {
        try {
            const data = await update(req.params.todoId, req.authUser.userId, req.body);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:todoId', validator(validations.todoIdParamValidation),
    async function __removeTodo(req, res, next) {
        try {
            const data = await remove(req.params.todoId, req.authUser.userId);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/status/complete/:todoId', validator(validations.todoIdParamValidation),
    async function _markTodo(req, res, next) {
        try {
            const data = await update(req.params.todoId, req.authUser.userId, { status: STATUS.COMPLETED });
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/status/pending/:todoId', validator(validations.todoIdParamValidation),
    async function _unmarkTodo(req, res, next) {
        try {
            const data = await update(req.params.todoId, req.authUser.userId, { status: STATUS.PENDING });
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/list', validator(validations.todoListValidation),
    async function _todoList(req, res, next) {
        try {
            const data = await list(req.authUser.userId, req.body);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }
);

export default router;