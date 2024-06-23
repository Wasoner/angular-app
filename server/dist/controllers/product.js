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
exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const sequelize_1 = require("sequelize");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield product_1.default.findAll();
    res.json({ listProducts });
});
exports.getProducts = getProducts;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const newProduct = yield product_1.default.create({
            name,
            description
        });
        res.json(newProduct);
    }
    catch (error) {
        res.status(500), (0, sequelize_1.json)({
            msg: 'Error al crear el producto', error
        });
    }
});
exports.addProduct = addProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const product = yield product_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({
                msg: 'Producto no encontrado'
            });
        }
        yield product.update({
            name,
            description
        });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al actualizar el producto', error
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield product_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        yield product.destroy();
        res.json({ message: "Producto eliminado con éxito" });
    }
    catch (error) {
        res.status(500).json({ message: "Hubo un error al eliminar el producto", error });
    }
});
exports.deleteProduct = deleteProduct;
