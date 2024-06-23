import { Server } from "./models/server";
import dotenv from 'dotenv'; 


// Configurar dotenv
dotenv.config(); // Con esto se logra que se imprima el puerto que esta configurado en el archivo .env


const server = new Server;

//server.listen();