"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./models/server");
const dotenv_1 = __importDefault(require("dotenv"));
// Configurar dotenv
dotenv_1.default.config(); // Con esto se logra que se imprima el puerto que esta configurado en el archivo .env
const server = new server_1.Server;
//server.listen();
