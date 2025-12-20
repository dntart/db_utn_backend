//AQUI VAN LAS RUTAS SIN LAS FUNCIONES
import { Router } from "express";

import productController from "../controllers/productController"; //importamos la CLASS que hace de contenedor de los controladores
import authMiddleware from "../middleware/authMiddleware";



const productRouter = Router() // esto reemplaza al app.

//TODAS LAS PETICIONES QUE LLEGAN AL productRouter empiezan con http://localhost:3000/products


//  GET PRODUCTS
productRouter.get("/", productController.getAllProducts) //getAllProducts es un modulo de toda la funciona que trae el producto

//GET PRODUCT end point dinamico
productRouter.get("/:id", productController.getProduct) //el archivo "productController" contiene "getProduct"

// POST
productRouter.post("/", authMiddleware,productController.addProduct)  //con autorizacion authMidleware

// PATCH ( UPDATE actualiza recurso existente, PUT tambien pero crea si no existe asi que no es conveniente)
productRouter.patch("/:id", authMiddleware,productController.updateProduct) //con autorizacion authMidleware

//DELETE 
productRouter.delete("/:id", authMiddleware,productController.deleteProduct) //con autoriz
// acion authMidleware



export default productRouter
