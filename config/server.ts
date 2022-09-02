import express, { Application } from 'express';
import { ConnectionToDB } from './connection';
import swaggerUI from 'swagger-ui-express';
import * as route from '../src/routes/index'; 
import openApiConfiguration from '../docs/swagger';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';
import cors from 'cors';

class Server {
    public app: Application;
    port: string;
    private NODE_ENV = process.env.NODE_ENV || 'development';

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        new ConnectionToDB;
        this.middleware();
        this.routes();
    }

    listen(): void {
        this.app.listen(this.port,() => {
            console.log(`Server run in port ${this.port}`);
        });
    }

    routes = (): void => {
        this.app.use('/documentation', 
                        swaggerUI.serve, 
                        swaggerUI.setup(openApiConfiguration));

        this.app.use('/api/users', route.userRoutes);
        this.app.use('/api/stores', route.storeRoutes);
        this.app.use('/api/login', route.loginRoutes);
        this.app.use('/api/countries', route.countryRoutes);
        this.app.use('/api/cities', route.cityRoutes);
        this.app.use('/api/addresses', route.addressRoutes);
        this.app.use('/api/products', route.productRoutes);
        this.app.use('/api/massive', route.massiveProductsRoute);
        this.app.use('/api/invoices', route.invoiceRoute);
        this.app.use('/api/geo', route.geoRoute);
    };

    middleware = ():void => {      
    this._cors();  
        this.app.use(express.json());
        //fileupload configuration
        this.app.use(
            fileUpload({
                useTempFiles : true,
                tempFileDir : '/tmp/'
            })
        );

        // configuration cloudinary
        cloudinary.v2.config({
            cloud_name: process.env.CLOUD_NAME_CLOUDINARY, 
            api_key: process.env.API_KEY_CLOUDINARY, 
            api_secret: process.env.API_SECRET_CLOUDINARY,
            secure: true
        });
    };

    _cors = ():void => {

        const options: cors.CorsOptions = {
            allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'X-Access-Token',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: '*',
            preflightContinue: false,
        };
        this.app.use(cors(options));
    };

}

export default Server;