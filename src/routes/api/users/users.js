import { Router } from 'express'

const api = Router();

/* GET /api/users ==> Retrieve all users */
api.get('/', async (req, res) => {
    res.json({"users": "passed !"});
})

export default api;