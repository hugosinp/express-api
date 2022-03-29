import { Router } from 'express'
import stuff from './stuff/stuff'

const api = Router();

// Add your routes here
api.use('/stuff', stuff);

export default api;