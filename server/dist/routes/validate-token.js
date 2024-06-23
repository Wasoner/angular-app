"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.validarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //tiene token
        const bearerToken = headerToken.slice(7);
        try {
            const decoded = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'secretKey');
            req.user = {
                username: decoded.Username,
                role: decoded.role
            };
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'Token no válido'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'No autorizado'
        });
    }
};
exports.validarToken = validarToken;
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({
            msg: 'No tienes permisos para realizar esta acción'
        });
    }
};
exports.isAdmin = isAdmin;
