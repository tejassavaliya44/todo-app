import express from 'express';
const router = express.Router();
import verifyToken from '../middlewares/verifyToken.js';
import authRoutes from './authentication.js';
import todoRoutes from './todo.js';

router.use('/authentication', authRoutes);
router.use('/todo', verifyToken, todoRoutes);

export default router;