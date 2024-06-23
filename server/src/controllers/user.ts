import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken";


export const newUser = async (req: Request, res: Response) => {

    const { Username, password, role } = req.body;

    // Validar que el usuario no exista
    const user = await User.findOne({ where: { Username: Username } });
    if (user) {
        return res.status(400).json({ // Si el usuario ya existe, devolver un error, y no se siga ejecutando.
            msg: `El usuario ${Username} ya existe`
        });
    }


    const hashPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña

    try {
        // Guardar en la base de datos
        await User.create({
            Username: Username,
            password: hashPassword,
            role: role || 'cliente'
        });
        res.json({
            msg: `Usuario ${Username} creado con éxito`,
        })
    } catch (error) {

        res.status(400).json({
            msg: 'Error al crear el usuario',
            error
        })

    }

};

export const loginUser = async (req: Request, res: Response) => {

    const { Username, password } = req.body;

    // Validar si el usuario existe en la base de datos

    const user: any = await User.findOne({ where: { Username: Username } });
    if (!user) {
        return res.status(400).json({
            msg: `El usuario ${Username} no existe`
        });
    }

    // Validamos la contraseña
    const passwordValida = await bcrypt.compare(password, user.password); // Comparamos la contraseña que nos envían con la que está en la base de datos
    if (!passwordValida) {
        return res.status(400).json({
            msg: 'La contraseña no es válida'
        });
    } else {
        const token = jwt.sign({
            Username: Username,
            role: user.role
        }, process.env.SECRET_KEY || 'secretKey',
        );

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
}