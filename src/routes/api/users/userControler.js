import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from './userModel';

/* GET /api/users ==> Retrieves all users */
export const getAllUsers = async (req, res) => {
    try {
        // Query 
        const allUsers = await User.find();

        //Response
        res.status(200).json({ 
            users: allUsers,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message: error.message });
    }

}

/* GET /api/users/:id ==> Retrieves specified user */
export const getOneUser = async (req, res) => {
    try {
        // Query 
        const user = await User.findOne({ _id: req.params.id });

        //Response
        res.status(200).json({ 
            user: user,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message: error.message });
    }

}

/* POST /api/users ==> Adds a new users */
export const createUser = async (req, res) => {
    try {
        const hashed = await bcrypt.hash(req.body.password, 10);

        // Object construction
        const user = new User({
            email: req.body.email,
            password: hashed
        });

        // Object saving promise
        const newUser = await user.save();

        res.status(201).json({ 
            message: "User created !",
            object: newUser,
            statusCode: 201
        });

    } catch(error) {
        res.status(400).json({ message : error.message });
    }

}

/* POST /api/users ==> Adds a new users */
export const logUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if(user) {
            const valid = await bcrypt.compare(req.body.password, user.password);
            if(valid) {
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '24h' }
                    ),
                    statusCode: 200
                })
            } else {
                res.status(401).json({
                    message: "Incorrect Password !",
                    statusCode: 401
                })
            }
        } else {
            res.status(404).json({ 
                message: "User not found",
                statusCode: 404
            });
        }

    } catch(error) {
        res.status(400).json({ message : error.message });
    }

}

/* PUT /api/users/:id ==> Modifies an existing users */
export const updateOneUser = async (req, res) => {
    try {
        // Object updating promise
        const modifiedUser = await User.updateOne(
            { _id: req.params.id }, 
            { ...req.body, _id: req.params.id }
        );

        res.status(200).json({ 
            message: "User modified ! ",
            object: modifiedUser,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message : error.message });
    }

}

/* DELETE /api/users/:id ==> Deletes an existing users */
export const deleteOneUser = async (req, res) => {
    try {
        // Object delete promise
        const deletedUser = await User.deleteOne(
            { _id: req.params.id },
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
