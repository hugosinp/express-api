import { Router } from 'express'
import {
    getAllStuff,
    getOneStuff,
    createStuff,
    updateOneStuff,
    deleteOneStuff
} from './stuffControler'

const api = Router();

api.get('/', getAllStuff);
api.get('/:id', getOneStuff);
api.post('/', createStuff);
api.put('/:id', updateOneStuff);
api.delete('/:id', deleteOneStuff);

export default api;