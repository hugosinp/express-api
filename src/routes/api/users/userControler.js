import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from './userModel';

/* GET /api/users ==> Retrieves all users */
export const getAllUsers = async (req, res) => {
    try {
        // Query 
        const allUsers = await User.find({}, ['username', 'email']);

        res.status(200).json({ 
            userList: allUsers,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message: error.message });
    }

}

/* GET /api/users/:username ==> Retrieves specified user by username */
export const getOneUserByUsername = async (req, res) => {
    try {
        // Query 
        const user = await User.findOne({ username: req.params.username });

        //Response
        res.status(200).json({ 
            user: user,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message: error.message });
    }
}

/* POST /api/users/signup ==> Creates a new user */
export const createUser = async (req, res) => {
    try {

        // Password Hashing
        const hashed = await bcrypt.hash(req.body.password, 10);

        // Query
        const newUser = await User.create({
            ...req.body,
            password: hashed
        });

        console.log(`✅ User : "${req.body.email}" -- register request success 200`);

        res.status(201).json({ 
            message: `User ${newUser.email} created !`,
            statusCode: 201
        });

    } catch(error) {
        console.log(`❌ User : "${req.body.email}" -- register request failed 400 \n ${error.message}`);
        res.status(400).json({ message : error.message });
    }

}

/* POST /api/users/login ==> Logs an user if he exists and if the provided credentials are valid */
export const logUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if(user) {
            const valid = await bcrypt.compare(req.body.password, user.password);
            if(valid) {

                console.log(`✅ User : "${req.body.email}" -- log request success 200`);

                res.status(200).json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    token: jwt.sign(
                        { _id: user._id },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '24h' }
                    ),
                });

            } else {

                console.log(`❌ User : "${req.body.email}" -- log request failed : Incorrect Password 401`);
                
                res.status(401).json({
                    message: "Incorrect Password !",
                    statusCode: 401
                });

            }
        } else {

            console.log(`❌ User : "${req.body.email}" -- log request failed : User Not found 404`);

            res.status(404).json({ 
                message: "User not found",
                statusCode: 404
            });

        }

    } catch(error) {
        res.status(400).json({ message : error.message });
    }

}

/* PUT /api/users/:username ==> Modifies an existing user */
export const updateOneUser = async (req, res) => {
    try {
        // Query
        const modifiedUser = await User.updateOne(
            { username: req.params.username }, 
            { ...req.body }
        );

        res.status(200).json({ 
            message: "User modified !",
            object: modifiedUser,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message : error.message });
    }

}

/* DELETE /api/users/:username ==> Deletes an existing user */
export const deleteOneUser = async (req, res) => {
    try {
        // Query
        const deletedUser = await User.deleteOne(
            { username: req.params.username },
        );

        res.status(200).json({ 
            message: "User deleted !",
            object: deletedUser,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message : error.message });
    }

}
