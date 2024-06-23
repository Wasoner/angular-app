import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    export interface Request {
        user?: {
            username: string,
            role: string
        }
    }
}


 export const validarToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //tiene token
        const bearerToken = headerToken.slice(7);

        try {

            const decoded:any = jwt.verify(bearerToken, process.env.SECRET_KEY || 'secretKey');
            
            req.user = {
                username: decoded.Username,
                role: decoded.role
            };
            
            next();

        } catch (error) {
            res.status(401).json({
                msg: 'Token no válido'
            });

        }

    } else {
        res.status(401).json({
            msg: 'No autorizado'
        });
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(req.user && req.user.role === 'admin'){
        next();
    } else {
        res.status(403).json({
            msg: 'No tienes permisos para realizar esta acción'
        });
    }
    
};
