import { Router } from 'express';
import auth from '../../../middlewares/auth';
import {
    getAllUsers,
    getOneUser,
    createUser,
    logUser,
    updateOneUser,
    deleteOneUser
} from './userControler';

const api = Router();

api.get('/', auth, getAllUsers);
api.get('/:id', getOneUser);
api.post('/register', createUser);
api.post('/login', logUser);
api.put('/:id', updateOneUser);
api.delete('/:id', deleteOneUser);

export default api;