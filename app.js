import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import HttpError from 'http-errors';
import logger from 'morgan';
import cors from 'cors';
import routes from './routes/index.js';
import dbService from './services/dbService.js';
import errorHandler from './middlewares/errorHandler.js';
const app = express();

app.use(cors({ origin: '*' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);
app.use((req, res, next) => { next(HttpError[404](`can't find ${req.url} on this server!`)) });
app.use(errorHandler);

const server = app.listen(process.env.PORT, async () => {
    try {
        console.log('Server running on PORT:', process.env.PORT);
        await dbService();
    } catch (error) {
        console.log(error);
    }
});

process.on('unhandledRejection', () => {
    server.close(() => {
        process.exit(1);
    })
});