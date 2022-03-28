import { Router } from 'express'

const api = Router();

/* GET /api/stuff ==> Retrieve all stuff */
api.get('/', async (req, res) => {
    res.json({"stuff": "passed !"});
})

export default api;