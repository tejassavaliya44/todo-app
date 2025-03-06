import ToDo from '../../models/todo.js';
import HttpError from 'http-errors';

async function getTodo(todoId, userId) {
    const filter = { _id: todoId, user_id: userId };
    const todo = await ToDo.findOne(filter).lean();
    if (!todo) throw new HttpError[404]('TODO not found!');
    return {
        message: 'Todo found successfully!',
        data: todo
    }
}

export default getTodo;