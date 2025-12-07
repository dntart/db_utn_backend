import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken" //jwt es nombre inventado, puede ser cualquiera por eso no esta {} 
import IUserTokenPayload from "../interfaces/IUserTokenPayload";
//VARIABLES DE ENTORNO
import dotenv from "dotenv" //importamos la herramienta de lectura de .env
dotenv.config() //ejecutamos la herramienta dotenv (esto se hace en c/archivo)



const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const SECRET_KEY = process.env.JWT_SECRET! //"!" Le dice a TypeScript que confíe en que no es undefined.

    const header = req.headers.authorization //HEADERS sive p dar informacion de contexto de la req
    if (!header) {            //solo las peticiones bruno con TOKEN pueden ingresar, ninguno mas a http://localhost:3000/products
        return res.status(401).json({ error: "El token es requerido" })  // ya no es void sino res, ¡Ojo!
    }
    const token = header.split(" ")[1]  //agregamos bearer + token desde bruno,(" ")es el criterio de division "espacio" y [1]es el resultado que quiero es decir el token sin el bearer

    try {  //mostrar productos
        const payload = jwt.verify(token, SECRET_KEY); //validacion valor del token/logginUser usuario dentro del middleware
        req.user = payload as IUserTokenPayload   // aqui ya solucionamos el req:any forzando al payload a seguir la interface IUserTokenPayload {id:string}ypeScript entiende qué es payload ➡ Y entiende que .user contiene algo con forma IUserTokenPayload.

        next()    // IMPORTANTEcumplida la funcion media pasa la siguiente NEXT

    } catch (e) {
        const error = e as Error
        res.status(401).json({ error: error.message })
    }
}
export default authMiddleware