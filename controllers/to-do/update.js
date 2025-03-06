import ToDo from '../../models/todo.js';

async function updateTodo(todoId, userId, params) {
    const filter = { _id: todoId, user_id: userId };
    const todo = await ToDo.findOneAndUpdate(filter, params, { new: true }).lean();
    return {
        message: 'Todo updated successfully!',
        data: todo
    }
}

export default updateTodo;