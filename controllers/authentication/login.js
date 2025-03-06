import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpError from 'http-errors';
import User from '../../models/user.js';

async function login(params) {
    const { username, password } = params;
    const userFilter = { username };
    const user = await User.findOne(userFilter).select('+password -created_at -updated_at').lean();
    if (!user) throw new HttpError[401]('Incorrect username or password!');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new HttpError[401]('Incorrect username or password!');
    delete user.password;
    const signObject = { userId: user._id };
    const token = jwt.sign(signObject, process.env.SECRET_LOGIN_KEY, { expiresIn: process.env.LOGIN_EXPIRATION });
    const response = { ...user, token };
    return {
        message: 'login successful!',
        data: response
    }
}

export default login;