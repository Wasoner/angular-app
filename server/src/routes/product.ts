import express from 'express';

import { Router } from 'express';
import { getProducts, deleteProduct, addProduct, updateProduct } from '../controllers/product';
import { isAdmin, validarToken } from '../routes/validate-token';
const router = express.Router();

router.get('/',validarToken, getProducts);
router.post('/', validarToken, isAdmin, addProduct);
router.put('/:id', validarToken, isAdmin, updateProduct);
router.delete('/:id', validarToken, isAdmin, deleteProduct);


export default router;