# INSTRUCCIONES POSTMAN

## Ruta '/api/productos/' 

- GET: '/'  
Lista todos los productos disponibles..
  
- GET: '/:id'  
Lista un producto por su id..
  
- POST: '/'  
Incorpora productos al listado.
  
- PUT: '/:id'  
Actualiza un producto por su id..
  
- DELETE: '/:id'  
Borra un producto por su id.
  
## Ruta '/api/carrito/'

- POST: '/'  
Crea un carrito y devuelve su id.  
  
- DELETE: '/:id'  
Elimina el carrito por 'id'.

- GET: '/'  
Lista todos los carritos creados.
  
- GET: '/:id/productos'  
Lista todos los productos guardados en el carrito 'id'.
  
- POST: '/:id/productos/:id_prod'  
Agrega el producto 'id_prod' al carrito 'id'.
  
- DELETE: '/:id/productos/:id_prod'  
Elimina el producto 'id_prod' del carrito 'id'.

