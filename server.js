import express from 'express';
import { routerProductos } from './router/routerProductos.js';
import { routerCarrito } from './router/routerCarrito.js';

const app = express();

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
	
app.use('/productos', (req, res) => {
	res.render('productos');
});

app.use('/carrito', (req, res) => {
	res.render('carrito');
});

app.use('/api/productos', routerProductos);

app.use('/api/carrito', routerCarrito);

app.get('*', (req, res) => {
	res.render('home');
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => console.log(`Error en el servidor ${error}`));