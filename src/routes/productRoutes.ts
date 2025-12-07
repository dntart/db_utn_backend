//AQUI VAN LAS RUTAS SIN LAS FUNCIONES
import { Router } from "express";

import productController from "../controllers/productController"; //importamos la CLASS que hace de contenedor de los controladores



const productRouter = Router() // esto reemplaza al app.

//TODAS LAS PETICIONES QUE LLEGAN AL productRouter empiezan con http://localhost:3000/products


//  GET PRODUCTS
productRouter.get("/", productController.getAllProducts) //getAllProducts es un modulo de toda la funciona que trae el producto

//GET PRODUCT end point dinamico
productRouter.get("/:id", productController.getProduct) //el archivo "productController" contiene "getProduct"

// POST
productRouter.post("/", productController.addProduct)

// PATCH ( UPDATE actualiza recurso existente, PUT tambien pero crea si no existe asi que no es conveniente)
productRouter.patch("/:id", productController.updateProduct)

//DELETE 
productRouter.delete("/:id", productController.deleteProduct)



export default productRouter
