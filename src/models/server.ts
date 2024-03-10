import express, { Application } from 'express';
import routesProduct from '../routes/product';
import routeUser from '../routes/user';
//import sequelize from '../db/connection';
import { Product } from './product';
import { User } from './user';

require('dotenv').config();

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';

        this.listen();
        this.midlewares();
        
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Running app port:' + this.port);
        })
    }

    routes() {
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routeUser);
    }

    midlewares() {
        this.app.use(express.json());
    }

    async dbConnect() {
        try {
            //await sequelize.authenticate();
            await Product.sync();
            await User.sync();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.log('Unable to connect to the database: ', error);
        }
    }

}

export default Server;