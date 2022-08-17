import express from "express";
import { addCart, deleteCart, getProducts, addProductToCart, deleteProduct } from "../controllers/controllerCart.js";
const routerCarts = express.Router();

//Agrego un Carrito
routerCarts.post('/', (req, res) => addCart(req, res));

//Borro un Carrito
routerCarts.delete('/:id', (req, res) => deleteCart(req, res));

//Agrego Productos al Carrito
routerCarts.get('/:id/products', (req, res) => getProducts(req, res));

//Agrego un Producto al Carrito
routerCarts.post('/:id/products', (req, res) => addProductToCart(req, res));

//Borro un producto del Carrito
routerCarts.delete('/:id/products/:id_prod', (req, res) => deleteProduct(req, res));

export default routerCarts;