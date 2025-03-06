import jwt from 'jsonwebtoken';
import HttpError from 'http-errors';

function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) throw new HttpError[401]('you are not authorized to perform this action!');
        const token = authHeader.split(' ')[1];
        if (!token) throw new HttpError[401]('you are not authorized to perform this action!');
        const decodedUser = jwt.verify(token, process.env.SECRET_LOGIN_KEY);
        req.authUser = decodedUser;
        next();
    } catch (error) {
        next(error);
    }
}

export default verifyToken;