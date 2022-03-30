import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

import routes from './routes';

export const launch = (port) => {
    const application = express();

    application.use(express.json());

    application.use('/', routes);

    application.listen(port, () => {
        console.log(`Server started at port http://localhost:${port} 🚀`);
    });

    dbConnect();
}

const dbConnect = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Connection to MongoDB established 🍀')
    } catch (error) {
        console.log('Connection to MongoDB failed !')
    }
}