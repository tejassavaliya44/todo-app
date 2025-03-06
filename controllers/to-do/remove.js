import ToDo from '../../models/todo.js';

async function removeTodo(todoId, userId) {
    const filter = { _id: todoId, user_id: userId };
    await ToDo.findOneAndDelete(filter).lean();
    return {
        message: 'Todo removed successfully!'
    }
}

export default removeTodo;