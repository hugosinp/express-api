import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        
        // Token validity check
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const userId = decodedToken._id;

        // User _id validity check for POST & PUT request 
        if(req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
        
    } catch (error) {
        console.error("❌ Unvalid Token : " + error.message);
        res.status(403).json({
            error: "Unvalid Token",
            statusCode: 403
        })
    }
}

export default auth;