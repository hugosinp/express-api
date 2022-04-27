import { Router } from 'express'
import itemsRoutes from './items/itemsRouter'
import userRoutes from './users/userRouter'

const api = Router();

// Add your routes here
api.use('/items', itemsRoutes);
api.use('/users', userRoutes);

export default api;