🌉MIDDLEWARE

En frameworks como Express.js (Node.js), el backend maneja las peticiones a través de una "pila" (stack) de funciones de middleware. Cada función de middleware tiene acceso al objeto de solicitud (req), al objeto de respuesta (res) y a una función next(): 
1. Una petición llega al servidor.
2. Pasa por el Middleware A (ej. Logging).
3. Si no se detiene, llama a next().
4. Pasa por el Middleware B (ej. Autenticación).
5. Si es exitoso, llama a next().
6. Llega al controlador de ruta principal (la lógica de negocio).
7. Se genera una respuesta que puede pasar por la pila de middlewares en sentido inverso antes de llegar al cliente.
El middleware permite construir aplicaciones de backend de forma modular, robusta y mantenible. 