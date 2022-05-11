import jwt from 'jsonwebtoken';
import User from '../routes/api/users/userModel'
const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const userId = decodedToken._id;

        if(req.body._id && req.body._id !== userId) {
            throw 'Invalid user ID';
        } 
        
        const user = await User.findOne({ _id: req.params._id });

        if(user) {
            console.log(user);
            next();
        }
        else {
            throw 'Unauthorized';
        }

    } catch (error) {
        res.status(403).json({
            error: error
        })
    }
}

export default auth;