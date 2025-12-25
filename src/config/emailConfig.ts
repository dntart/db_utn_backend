import nodemailer from "nodemailer"

/* usamos VARIABLES DE ENTORNO para establecer conexion */
const USER = process.env.EMAIL_USER
const PASS = process.env.EMAIL_PASS

/* creamos CONEXION con servidor  */
const transporter = nodemailer.createTransport({
service: "gmail",  //servicio
auth:{
    user: USER,
    pass: PASS
}
})
export default transporter
