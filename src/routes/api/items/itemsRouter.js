import { Router } from 'express'
import {
    getAllItems,
    getOneItem,
    createItem,
    updateOneItem,
    deleteOneItem
} from './itemsControler'

const api = Router();

api.get('/', getAllItems);
api.get('/:id', getOneItem);
api.post('/', createItem);
api.put('/:id', updateOneItem);
api.delete('/:id', deleteOneItem);

export default api;