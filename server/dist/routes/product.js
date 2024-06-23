"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const validate_token_1 = require("../routes/validate-token");
const router = express_1.default.Router();
router.get('/', validate_token_1.validarToken, product_1.getProducts);
router.post('/', validate_token_1.validarToken, validate_token_1.isAdmin, product_1.addProduct);
router.put('/:id', validate_token_1.validarToken, validate_token_1.isAdmin, product_1.updateProduct);
router.delete('/:id', validate_token_1.validarToken, validate_token_1.isAdmin, product_1.deleteProduct);
exports.default = router;
