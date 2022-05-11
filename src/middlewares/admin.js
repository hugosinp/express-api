import jwt from 'jsonwebtoken';
import User from '../routes/api/users/userModel';

const admin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const userId = decodedToken._id;

        if(req.body._id && req.body._id !== userId) {
            throw 'Invalid user ID';
        } 
        
        const user = await User.findOne({ _id: req.body._id });

        if(user.isAdmin === true) {
            next();
        } else {
            throw 'Unauthorized';
        }

    } catch (error) {
        res.status(401).json({
            error: error,
            statusCode: 401
        })
    }
}

export default admin;