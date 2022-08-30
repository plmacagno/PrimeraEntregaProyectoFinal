import fs from 'fs';
import { getProductById } from './apiProductos.js';

const routeCart = 'data/carrito.json';

export const createCart = async () => {
	const stamp = new Date().toLocaleString('es-AR');
	const arrayCart = await getCart();
	let identificador = 0;
	let indexArray = [];
	arrayCart.forEach((e) => indexArray.push(e.id));
	if (indexArray.length > 0) {
		const arraySorted = indexArray.sort((a, b) => b - a);
		identificador = arraySorted[0] + 1;
	} else {
		identificador = 1;
	}
	const nuevo = { id: identificador, timestamp: stamp, productos: [] };
	arrayCart.unshift(nuevo);
	try {
		await fs.promises.writeFile(routeCart, JSON.stringify(arrayCart, null, 2));
		return { estado: `¡Carrito id: ${identificador} creado!` };
	} catch (err) {
		console.log('Error: ', err)
	}
}

export const getCart = async () => {
	try {
		const result = await fs.promises.readFile(routeCart, 'utf-8');
		return JSON.parse(result);
	} catch (err) {
		await fs.promises.writeFile(routeCart, JSON.stringify([], null, 2));
		const result = await fs.promises.readFile(routeCart, 'utf-8');
		return JSON.parse(result);
	}
}

export const addProductById = async (cart, prod) => {
	const idProd = { id: prod };
	const product = await getProductById(idProd);
	const errorProd = JSON.stringify(product).search('error');
	if (errorProd != -1) {
		return { error: '¡El producto no existe!' };
	}
	const idCart = { id: cart };
	const productosCarro = await getCartProductsById(idCart);
	const errorCarro = JSON.stringify(productosCarro).search('error');
	if (errorCarro != -1) {
		return { error: '¡El carrito no existe!' };
	}
	let actualizado = [];
	productosCarro.forEach((e) => actualizado.push(e));
	actualizado.push(product);
	const response = await updateCart(actualizado, cart);
	return response;
}

export const updateCart = async (cart, identificador) => {
	const arrayCart = await getCart();
	const id = parseInt(identificador);
	const productos = cart;
	const stamp = new Date().toLocaleString('es-AR');
	const updated = { id: id, timestamp: stamp, productos: productos };
	const actualizado = JSON.stringify(arrayCart.find((e) => e.id === id));
	const index = arrayCart.findIndex((e) => e.id === id);
	if (actualizado) {
		arrayCart[index] = updated;
		try {
			await fs.promises.writeFile(routeCart, JSON.stringify(arrayCart, null, 2));
			return { estado: '¡Producto agregado!' };
		} catch (err) {
			console.log('Error: ', err);
		}
	} else {
		return { error: '¡El carrito no existe!' };
	}
}

export const deleteProductById = async (cart, identificador) => {
	const arrayCart = await getCart();
	const stamp = new Date().toLocaleString('es-AR');
	const id = parseInt(identificador);
	const index = arrayCart.findIndex((e) => e.id == cart);
	if (index === -1) {
		return { error: '¡El carrito no existe!' };
	}
	const indice = arrayCart[index].productos.findIndex((e) => e.id == id);
	if (indice === -1) {
		return { error: '¡El producto no existe en el carrito!' };
	}
	try {
		const newProduct = arrayCart[index].productos.filter((e) => e.id != id);
		arrayCart[index].productos = newProduct;
		arrayCart[index].timestamp = stamp;
		await fs.promises.writeFile(routeCart, JSON.stringify(arrayCart, null, 2));
		return { estado: `¡Producto id: ${id} eliminado!` };
	} catch (err) {
		console.log('Error: ', err);
	}
}

export const deleteCart = async (identificador) => {
	const arrayCart = await getCart();
	const id = parseInt(identificador.id);
	const index = arrayCart.findIndex((e) => e.id === id);
	if (index != -1) {
		try {
			const borrado = arrayCart.filter((e) => e.id != id);
			await fs.promises.writeFile(routeCart, JSON.stringify(borrado, null, 2));
			return { estado: `¡Carrito id: ${id} eliminado!` };
		} catch (err) {
			console.log('Error: ', err);
		}
	} else {
		return { error: '¡El carrito no existe!' };
	}
}

export const getCartProductsById = async (identificador) => {
	const arrayCart = await getCart();
	const id = parseInt(identificador.id);
	const hallado = arrayCart.find((e) => e.id === id);
	if (hallado) {
		return hallado.productos;
	} else {
		return { error: '¡El carrito no existe!' };
	}
}

export const getCartById = async (identificador) => {
	const arrayCart = await getCart();
	const id = parseInt(identificador.id);
	const hallado = arrayCart.find((e) => e.id === id);
	if (hallado) {
		return hallado;
	} else {
		return { error: '¡El carrito no existe!' };
	}
}