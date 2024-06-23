"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const product_2 = __importDefault(require("./product"));
const user_2 = __importDefault(require("./user"));
class Server {
    constructor() {
        this.app = (0, express_1.default)(); // inicializamos express
        this.port = process.env.PORT || '3001'; // inicializamos el puerto
        this.listen(); // llamamos al método listen
        this.dbConnect(); // llamamos al método dbConnect
        this.midlewares(); // llamamos al método midlewares
        this.routes(); // llamamos al método routes
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('App corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/product', product_1.default);
        this.app.use('/api/user', user_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_2.default.sync();
                yield user_2.default.sync();
                console.log('Conexión establecida con la base de datos');
            }
            catch (error) {
                console.log('No se pudo conectar a la base de datos', error);
            }
        });
    }
}
exports.Server = Server;
exports.default = Server; // exportamos la clase Server
