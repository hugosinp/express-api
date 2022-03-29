import { Router } from 'express'
import {
    getAllUsers,
    getOneUser,
    createUser,
    updateOneUser,
    deleteOneUser
} from './userControler'

const api = Router();

api.get('/', getAllUsers);
api.get('/:id', getOneUser);

api.post('/signup', createUser);

api.put('/:id', updateOneUser);

api.delete('/:id', deleteOneUser);

export default api;