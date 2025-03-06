import bcrypt from 'bcrypt';
import HttpError from 'http-errors';
import User from '../../models/user.js';

async function signup(params) {
    const { username, email, password } = params;
    const existingUser = await User.findOne({ username }).lean();
    if (existingUser) throw new HttpError[401]('User already exists with the same username!');
    const hashedPassword = await bcrypt.hash(password, 12);
    const userObject = { username, email, password: hashedPassword };
    const user = await User.create(userObject);
    delete user._doc.password;
    return {
        message: 'signup successful!',
        data: user
    }
}

export default signup;