//  importar herramientas y bibliotecas
import express, { Response, Request, } from "express"   // from marca la carpeta en module donde esta la herramienta "express" en este caso
import cors from "cors"  // antes lo instalamos "npm i cors" p poder vicular servicios de origen diferentes
import connectDB from "./config/mongodb"
import authMiddleware from "./middleware/authMiddleware"
import productRouter from "./routes/productRoutes"
import authRouter from "./routes/authRoutes"
import morgan from "morgan"  // instalamos con "npm i morgan" 

import logger from "./config/logger" // script module para guardar en un .log los request
import limiter from "./middleware/rateLimitMiddleware"
//VARIABLES DE ENTORNO
import dotenv from "dotenv" //importamos la herramienta de lectura de .env
import IUserTokenPayload from "./interfaces/IUserTokenPayload"
dotenv.config() //ejecutamos la herramienta dotenv (esto se hace en c/archivo)





declare global { //al ser global solo puede declararselo aqui para todo el proyecto
    namespace Express {
        interface Request {
            user?: IUserTokenPayload // es la interfase de validacion del token del user
        }
    }
}

// //funcion para .ENV para no repetir la lectura en cada oportunidad (no funciono importandola ver porque)
// export const getEnv = () => {
//     return {
//         PORT: process.env.PORT,
//         JWT_SECRET: process.env.JWT_SECRET,
//         URI_DB: process.env.URI_DB
//     }
// }
// const env = getEnv()


//  credenciales y conexiones back y DB

const PORT = process.env.PORT //traemos el puerto de .ENV.LOQUECORRESPONDA 

// connectDB antes habia un connect que se convirtio en modulo

//EXPRESS
const app = express()  // invocamos express
app.use(cors())           // para poder vicular servicios de origen diferentes
app.use(express.json()) // parsea json a js desde cliente http o externo, ej. POST desde bruno

// CAPTURAR DATOS DE REQUEST
app.use(morgan("dev"))  //  usamos "MORGAN" para capturar datos de req y analizarlo IMPORTANTE
// SCRIPT MODULE PARA ANALIZAR REQS
app.use(logger)  //crea carpeta logs con las request para analizar despues IMPORTANTE

//LIMITES DE PETICIONES
//app.use(limiter) // es un error usarlo asi porque limitaria las peticiones por ejemplo de productos

//INTERFASE
//SCHEMA
// SCHEMA DE NUEVO USUARIO


//MODEL  (antes habia User y Product model se convirtio en module)

// model de User Schema

//MIDDLEWARE + next + bearer token desde bruno

//END POINT PARA COMUNICAR ESTADO INTERNO DE LA API    
//GET PRODUCTS
//GET PRODUCT end point dinamico
//POST
//DELETE 
//PATCH ( UPDATE actualiza recurso existente, PUT tambien pero crea si no existe asi que no es conveniente)

//POST USER //convertido a module
// POST LOGIN // convertido a module
//HABILITAMOS REGISTER/LOGIN
app.use("/auth", limiter, authRouter) // AUTHLIMITER limites a la peticiones de registro y login

//HABILITAMOS END POINTS - CRUD  //  authMiddleware, lo saque para probar una cosa
app.use("/products", authMiddleware, productRouter) //las peticiones a product disparan el modulo PRODUCT ROUTER
//agregamos "authMiddleweare" y lo sacamos de c/u de las funciones porque era un psao repetido

app.use("", (__: Request, res: Response) => { //el req no envia nada en params,body,headers,entonces lo reemplazamos por "__" 
    res.status(404).json({ error: "El recurso no se encuentra" })
})   //validacion todas * las url no tipadas son incorrectas

app.listen(PORT, () => {
    console.log(`✅SERVIDOR EN ESCUCHA EN EL PUERTO http://localhost:${PORT}`)
    connectDB()  //declarado al comienzo
})
