import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const userModel = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: false }
});

userModel.plugin(uniqueValidator);

export default mongoose.model('User', userModel);