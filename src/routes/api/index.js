import { Router } from 'express'
import users from './users/users'
import stuff from './stuff/stuff'

const api = Router();

api.use('/users', users);
api.use('/stuff', stuff);

export default api;