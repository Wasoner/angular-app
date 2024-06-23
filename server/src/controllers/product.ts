import { Request, Response } from 'express';
import Product from '../models/product';
import { json } from 'sequelize';



export const getProducts = async (req: Request, res: Response) => {

    const listProducts = await Product.findAll();

    res.json({listProducts})

}

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, description} = req.body;
        const newProduct = await Product.create({
            name,
            description
        });
        res.json(newProduct);
        
    } catch (error) {
        res.status(500),json({
            msg: 'Error al crear el producto', error
        });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({
                msg: 'Producto no encontrado'
            });
        }

        await product.update({
            name,
            description
        });

        res.json(product);
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error al actualizar el producto', error
        });
        
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await product.destroy();
        res.json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Hubo un error al eliminar el producto", error });
    }
};
