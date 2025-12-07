import { connect } from "mongoose"
//VARIABLES DE ENTORNO
import dotenv from "dotenv" //importamos la herramienta de lectura de .env
dotenv.config() //ejecutamos la herramienta dotenv (esto se hace en c/archivo)


const connectDB = async () => {     // funcion de conexion asincrona a mongodb //invocada al final de todo
    const URI_DB = process.env.URI_DB! //".env" que contiene el url de mongodb/ "!" Le dice a TypeScript que confíe en que no es undefined.

    try {
        await connect(URI_DB)  //herramienta de mongoose
        console.log("✅ CONECTADO A MONGODB CON EXITO")
    } catch (e) {
        console.log("❌ERROR AL CONECTARSE A MONGODB")
        process.exit(1)   // comando de node que sirve para detener el programa el "1" indica error y final, el "0" es exito
    }
}
export default connectDB