import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export class ConnectionToDB {
    constructor() {
        this.db();
    }

    db = async () => {
        try {
            //await mongoose.connect('mongodb://eduard:EDU4rd87@localhost:27017/pruebadb');
            await mongoose.connect(`mongodb://${process.env.HOST}:${process.env.PORT_DB}/${process.env.DB}`);
            console.log('conexion exitosa');
        } catch (error) {
            console.log('error db connection');
            console.log(error);
        }
    };
}