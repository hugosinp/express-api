import mongoose from 'mongoose';

const itemModel = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    imageUrl: { type: String, required: false },
    userId: { type: String, required: false },
    price: { type: Number, required: false },
});

export default mongoose.model('Item', itemModel);