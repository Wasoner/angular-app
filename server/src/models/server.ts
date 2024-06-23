import express from 'express';
import cors from 'cors';
import routesProduct from "../routes/product";
import routesUser from "../routes/user";
import Product from './product';
import User from './user';



export class Server {

    private app: express.Application; // app es una propiedad de la clase Server
    private port: string; // port es una propiedad de la clase Server

    constructor (){ // constructor de la clase Server
        this.app = express();  // inicializamos express
        this.port = process.env.PORT || '3001'; // inicializamos el puerto
        this.listen(); // llamamos al método listen
        this.dbConnect(); // llamamos al método dbConnect
        this.midlewares(); // llamamos al método midlewares
        this.routes(); // llamamos al método routes
    }

    listen(){  // método para escuchar el puerto
        this.app.listen(this.port, () => {
            console.log('App corriendo en el puerto ' + this.port);
        })
    }

    routes(){ // método para configurar las rutas
        this.app.use('/api/product', routesProduct);
        this.app.use('/api/user', routesUser);

    }

    midlewares(){ // método para configurar los midlewares
        this.app.use(express.json());
        this.app.use(cors());

    }

    async dbConnect(){ // método para conectar a la base de datos
        try{
            await Product.sync();
            await User.sync();
            console.log('Conexión establecida con la base de datos');
        }
        catch(error){
            console.log('No se pudo conectar a la base de datos', error);
        }
    }
}

export default Server; // exportamos la clase Server