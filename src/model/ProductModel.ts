import { model, Model, Schema } from "mongoose"
import IProduct from "../interfaces/IProduct"

// con MAYUSCULA ProcutModels porque es un contrato DEFINE EL ESQUEMA DE DATOS
// 1- Crea la colección en mongodb
// 2- Habilita los métodos de manipulacion de data

const productSchema = new Schema<IProduct>({    //tipado de MONGOOSE basado en intefase Product
    name: { type: String, required: true },  //con mayuscula?averiguar
    description: { type: String, default: "No tiene description" },
    stock: { type: Number, default: 0, min: 0 }, //minimo para que no pongan -10
    category: { type: String, default: "No tiene category" },
    price: { type: Number, default: 0, min: 0 }
}, {
    versionKey: false  // historial de versiones que da por defecto mongoose
})
const Product: Model<IProduct> = model("Product", productSchema) // model funcion 1 determina NOMBRE BR"Product", y luego su estructura basado en SCHEMA

export default Product