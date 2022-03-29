import { Router } from 'express'
import stuffRoutes from './stuff/stuffRouter'
import userRoutes from './users/userRouter'

const api = Router();

// Add your routes here
api.use('/stuff', stuffRoutes);
api.use('/users', userRoutes);

export default api;