import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const itemModel = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    imageUrl: { type: String, required: false },
    userId: { type: String, required: false },
    price: { type: Number, required: false },
    slug: { type: String, required: true },
});

itemModel.plugin(uniqueValidator);

export default mongoose.model('Item', itemModel);