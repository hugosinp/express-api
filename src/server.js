import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'

import 'dotenv/config';

import routes from './routes';

export const launch = (port) => {
    const application = express();

    application.use(cors());

    application.use(express.json());
    application.use(express.urlencoded({ extended: true }));

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