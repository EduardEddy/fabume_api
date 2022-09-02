import dotenv from 'dotenv';
import Server from './config/server';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';

const server = new Server;
if(NODE_ENV !== 'test' ) {
    server.listen();
}

export default server;