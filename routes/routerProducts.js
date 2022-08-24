import express from "express";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../controllers/controllerProducts.js";

const routerProducts = express.Router();


//Traigo productos seleccionados
routerProducts.get('/:id?', (req, res) =>  getProducts(req, res));

//Agrego producto
routerProducts.post('/', (req, res) =>  addProduct(req, res));

//Actualizo producto
routerProducts.put('/:id', (req, res) =>  updateProduct(req, res));

//Borro Producto
routerProducts.delete('/:id', (req, res) =>  deleteProduct(req, res));

export default routerProducts;