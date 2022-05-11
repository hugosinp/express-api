import { Router } from 'express';
import auth from '../../../middlewares/auth';
import admin from '../../../middlewares/admin';

import {
    getAllUsers,
    getOneUserByUsername,
    createUser,
    logUser,
    updateOneUser,
    deleteOneUser
} from './userControler';

const api = Router();

api.get('/', auth, admin, getAllUsers);
api.get('/:username', getOneUserByUsername);
api.post('/register', createUser);
api.post('/login', logUser);
api.put('/:username', updateOneUser);
api.delete('/:username', deleteOneUser);

export default api;