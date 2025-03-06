async function errorHandler(error, req, res, next) {
    if (error.name == "TokenExpiredError" || error.name == "JsonWebTokenError") {
        error.status = 408;
        error.message = 'session expired!';
    }
    const { message, data } = error;
    const status = error?.status || 500;
    return res.status(status).json({ message, data });
}

export default errorHandler;