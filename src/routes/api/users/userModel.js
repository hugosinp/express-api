import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const userModel = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

userModel.plugin(uniqueValidator);

export default mongoose.model('User', userModel);