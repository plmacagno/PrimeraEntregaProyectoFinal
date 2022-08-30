import express from 'express';
import Router from 'express';
import { isAdmin } from '../middleware/isAdmin.js';
import { saveProduct, getProducts, updateProduct, deleteProduct, getProductById } from '../api/apiProductos.js';

const routerProductos = Router();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

routerProductos.get('/', async (req, res) => {
	const arrayProductos = await getProducts();
	res.json(arrayProductos);
});

routerProductos.get('/:id', async (req, res) => {
	const id = req.params;
	const response = await getProductById(id);
	res.json(response);
});

routerProductos.post('/', async (req, res) => {
	const administrador = isAdmin();
	if (administrador) {
		const product = req.body;
		const response = await saveProduct(product);
		res.json(response);
	} else {
		const response = { error: '-1', descripcion: "¡Ruta '/api/productos' método 'POST' no autorizada!" }
		res.json(response);
	}
});

routerProductos.put('/:id', async (req, res) => {
	const administrador = isAdmin();
	if (administrador) {
		const product = req.body;
		const id = req.params;
		const response = await updateProduct(product, id);
		res.json(response);
	} else {
		const response = { error: '-1', descripcion: "¡Ruta '/api/productos' método 'POST' no autorizada!" };
		res.json(response);
	}
});

routerProductos.delete('/:id', async (req, res) => {
	const administrador = isAdmin();
	if (administrador) {
		const id = req.params
		const response = await deleteProduct(id)
		res.json(response)
	} else {
		const response = { error: '-1', descripcion: "¡Ruta '/api/productos' método 'POST' no autorizada!" };
		res.json(response);
	}
});

export { routerProductos };