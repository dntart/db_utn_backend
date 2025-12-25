import bcrypt from "bcryptjs"
import { Response, Request } from "express"   // from marca la carpeta en module donde esta la herramienta "express" en este caso
import jwt from "jsonwebtoken"
import User from "../model/AuthModel"
//VARIABLES DE ENTORNO
import dotenv from "dotenv" //importamos la herramienta de lectura de .env
dotenv.config() //ejecutamos la herramienta dotenv (esto se hace en c/archivo)

const SECRET_KEY = process.env.JWT_SECRET! // "!" Le dice a TypeScript que confíe en que no es undefined.// DUPLICADO AQUI Y EN MODULO AUTHMIDDLEWARE

// CLASS creamos una class para contener a los 2 controladores de autorizacion
class AuthController {
    // REGISTER
    static authRegister = async (req: Request, res: Response): Promise<void | Response> => { //se reemplaza const x STATIC de CLASS
        try {
            const body = req.body
            const { email, password } = body //destructuring
            if (!email || !password) {      //1ra validación 2 datos requeridos
                return res.status(400).json({ succes: false, error: "Datos invalidos" })
            }
            //validacion de repeticion
            const user = await User.findOne({ email }) //User model buscamos en DB si existe ese usuario 
            if (user){
                return res.status(409).json({succes:false, error:"el usuario ya existe en la basa de datos"}) ///si existe Error
            }

                // si no hay usuario existente HASHEAMOS el password del nuevo usuairo
                const hash = await bcrypt.hash(password, 10) //(parametro, salt o veces que va a encriptar x10 en este caso)
            //2da validacion escribiendo el caso de usuario repetido, pero hay una mejor forma
            // const user = await User.findOne({ email }) // 2 validacion si existe User model/sintaxis mongodb
            //if (user) {  return res.status(409).json({ mesagge: "Usuario ya existe en la base de dato" }) //error de dato repetido
            //}
            const newUser = new User({   // creacion NUEVO USUARIO,ver sintaxis de mongodb// User es un model
                email,
                password: hash
            })
            //creamos nuevo usuario en DB
            await newUser.save() //guardar en mongo, si sale bien el post de bruno da un id de mongodb //olvide las comillas y no me funcionaba nada, ojo!
            res.status(201).json({ succes: true, data: newUser })
        } catch (e) {
            const error = e as Error
            if (error.name === "MongoServerError") {  //2da validación "MongoServerError" es un mensaje estandar de mongodb que da cuando hay usuario repetido
                return res.status(409).json({ succes: false, error: "Usuario ya existente en base de datos" })
            }
        }
    }
    // LOGIN
    static authLogin = async (req: Request, res: Response) => { //se reemplaza const x STATIC de CLASS
        try {
            const body = req.body     //captura input body
            const { email, password } = body
            if (!email || !password) {    //1ra validación existencia
                return res.status(400).json({ succes: false, error: "debe completas los campos, correo y contraseña" })
            }

            const user = await User.findOne({ email })   //2da validacion de email invalido/ aqui tambien se crea un "user" en mongoose
            if (!user) {
                return res.status(401).json({ succes: false, error: "No autorizado" })
            }

            // validar la contraseña isValid (comparando el body.password con el user.password)
            const isValid = await bcrypt.compare(password, user.password)  //aplica un hash nuevo y compara con el primero p ver si tienen la misma fuente detexto plano
            if (!isValid) {
                return res.status(401).json({ succes: false, error: "No autorizado" }) // no se pone contraseña incorrecta porque nos regalamos con los hackers
            }

            //TOKEN/ 1.payload, info pública. 2.Clave secreta o firma. 3.opciones ej cuando expira
            const token = jwt.sign({ id: user._id, email:user.email }, SECRET_KEY, { expiresIn: "1h" }) //para prueba añadimos email    

            res.json({ succes: true, token: token }) //caso exito que paso las validaciones y el correo del user existe

        } catch (e) {
            const error = e as Error
            res.status(500).json({ succes: false, error: error.message })
        }
    }
}
export default AuthController