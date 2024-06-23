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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Username, password, role } = req.body;
    // Validar que el usuario no exista
    const user = yield user_1.User.findOne({ where: { Username: Username } });
    if (user) {
        return res.status(400).json({
            msg: `El usuario ${Username} ya existe`
        });
    }
    const hashPassword = yield bcrypt_1.default.hash(password, 10); // Encriptar la contraseña
    try {
        // Guardar en la base de datos
        yield user_1.User.create({
            Username: Username,
            password: hashPassword,
            role: role || 'cliente'
        });
        res.json({
            msg: `Usuario ${Username} creado con éxito`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error al crear el usuario',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Username, password } = req.body;
    // Validar si el usuario existe en la base de datos
    const user = yield user_1.User.findOne({ where: { Username: Username } });
    if (!user) {
        return res.status(400).json({
            msg: `El usuario ${Username} no existe`
        });
    }
    // Validamos la contraseña
    const passwordValida = yield bcrypt_1.default.compare(password, user.password); // Comparamos la contraseña que nos envían con la que está en la base de datos
    if (!passwordValida) {
        return res.status(400).json({
            msg: 'La contraseña no es válida'
        });
    }
    else {
        const token = jsonwebtoken_1.default.sign({
            Username: Username,
            role: user.role
        }, process.env.SECRET_KEY || 'secretKey');
        res.json({
            msg: "Usuario logueado con éxito",
            token
        });
    }
    /*
         // Generar el JWT (JSON Web Token)
        const token = jwt.sign({
            Username: Username
        }, process.env.SECRET_KEY || 'secretKey' , {
            expiresIn: '10000'
        });
    
        res.json(token);
    */
});
exports.loginUser = loginUser;
