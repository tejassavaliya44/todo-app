import ToDo from '../../models/todo.js';
import HttpError from 'http-errors';
import moment from 'moment';

async function getTodoList(userId, params) {
    const startDate = moment(params.due_date).startOf('day').format();
    const endDate = moment(params.due_date).endOf('day').format();
    console.log({ startDate, endDate });
    const filter = {
        user_id: userId,
        due_date: { $gte: startDate, $lt: endDate }
    };
    const todo = await ToDo.find(filter).lean();
    if (!todo) throw new HttpError[404]('TODO not found!');
    return {
        message: 'Todo found successfully!',
        data: todo
    }
}

export default getTodoList;