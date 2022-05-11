import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const userId = decodedToken._id;

        console.log(decodedToken);

        console.log(userId);
        console.log(req.body);

        if(req.body._id && req.body._id !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch (error) {
        res.status(403).json({
            error: error
        })
    }
}

export default auth;