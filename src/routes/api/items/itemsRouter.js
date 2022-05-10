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
api.get('/:slug', getOneItem);
api.post('/', createItem);
api.put('/:slug', updateOneItem);
api.delete('/:slug', deleteOneItem);

export default api;