import {  Router } from "express";
import AuthController from "../controllers/authController";


const authRouter = Router()  //se comienza conteniendo el llamado de la funcion()

//TODAS LAS PETICIONES QUE LLEGAN AL authRouter empiezan con http://localhost:3000/auth

http://localhost:3000/auth/register
authRouter.post("/register", AuthController.authRegister)  //en la ruta va la ruta y la invocacion al controller, no solo la ruta

http://localhost:3000/auth/login
authRouter.post("/login", AuthController.authLogin)//en la ruta va la ruta y la invocacion al controller, no solo la ruta

export default authRouter