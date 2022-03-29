import express from 'express';
import mongoose from 'mongoose';

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
        mongoose.connect('mongodb+srv://hugosinp:Cluster0@cluster0.zoeod.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Connexion à MongoDB réussie !')
    } catch (error) {
        console.log('Connexion à MongoDB échouée !')
    }
}