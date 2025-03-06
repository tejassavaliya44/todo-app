import ToDo from '../../models/todo.js';
import User from '../../models/user.js';
import scheduleReminder from '../../services/scheduleReminder.js';

async function createTodo(userId, params) {
    const todo = await ToDo.create({ ...params, user_id: userId });
    const user = await User.findById(userId).lean();
    const scheduleParams = { email: user.email, title: params.title };
    scheduleReminder(todo._id.toString(), scheduleParams, params.reminder_time);
    return {
        message: 'Todo added successfully!',
        data: todo
    }
}

export default createTodo;