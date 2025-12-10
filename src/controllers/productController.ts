// AQUI VAN LAS FUNCIONES SIN LA RUTAS
import { Request, Response } from "express"
import Product from "../model/ProductModel"
import { Types } from "mongoose"
import { createProductSchema, updateProductSchema } from "../validators/productValidator" //validador

// CLASS para contener a todos los controladoras POO
class ProductController {
    // GET ALL - HOME   
    static getAllProducts = async (req: Request, res: Response): Promise<void | Response> => { //reemplazamos CONST X STATIC de class
        try {
            const products = await Product.find() // Product con mayuscula es el model de mongoose
            res.json({ succes: true, data: { products } }) //ESTANDARIZACION DE RESPUESTA{exito} /.find() es sintaxis de mongosh, como .findById
        } catch (e) {
            const error = e as Error
            res.status(500).json({ succes: false, error: error.message }) //ESTANDARIZACION DE RESPUESTA{no exito} 
        }
    }
    // GET
    static getProduct = async (req: Request, res: Response): Promise<void | Response> => { //reemplazamos CONST X STATIC de class
        try {
            const { id } = req.params //DESTRUCTURING, ANTES: const id = req.params.id    

            if (!Types.ObjectId.isValid(id)) {  //prevencion de error, “Si el id NO es un ObjectId válido…” sintaxis de mongoose p/no mostrar el codigo al usuario en bruno, cuando por ej. coloca un id roto
                return res.status(400).json({ succes: false, error: "ID inválido" }) //detenemos el error antes de buscar
            }
            const productoEncontrado = await Product.findById(id)  // busqueda y coincidencia con sintaxis mongosh .findById()
            if (!productoEncontrado) {
                return res.status(404).json({ succes: false, message: "Product no encontrado" })//ESTANDARIZACION DE RESPUESTA{no exito}    //res.json es como console.log()
            }
            res.status(200).json({ succes: true, data: productoEncontrado })//ESTANDARIZACION DE RESPUESTA{exito}({productoEncontrado}) esta mal las llaves dan un objeto que envuelve a la variable productoEncontrado


        } catch (e) {
            const error = e as Error //typescripto toma e unknow debemos tiparlo
            res.status(500).json({success:false, error: error.message }) //sino tipamos no podemos acceder a mensaje de error
        }
    }
    // POST
    static addProduct = async (req: Request, res: Response): Promise<void | Response> => {  //se reemplaza const x STATIC de CLASS
        try {
            const { body } = req  // RESTRUCTURING, antes "const body = req.body"   // body es el cuerpo del json que llega del cliente. este lo contiene en body
            const { name, description, price, category, stock } = body // destructuring  de products para schema

            //antes validar SCHEMA o sanitizar los datos 
            //validamos existencia keys
            if (!name || !description || !price || !category || !stock) {   // si no tienen esto falla la req
                return res.status(400).json({ success: false, error: "DATOS INVALIDOS" }) //400 bad request
            }
            //validamos las keys values mediante un filtro "createProductSchema"
            const validator = createProductSchema.safeParse(body)  //.safeParse en un método de ZOD que compara el schema con (req.body)/su resultado da un obect { succes:bolean, data:{}}
            if (!validator.success) {  //validator arroja {success:true/false, data:{ ..., ..., ...}}
                return res.status(400).json(validator.error.flatten().fieldErrors) //.flaten() simplifica el msj error y .field()organiza el msj por campos
            }
            //validamos las keys values de a 1
            // if (!name || typeof name !== "string" || name.trim().length < 3) {//.trim previene contar los espacios al comienzo y al final/y .length previene que sea corto
            //     return res.status(400).json({ succes: false, error: "nombre inválido" })
            // }    
            // if (!description || typeof description !== "string") {
            //     return res.status(400).json({ succes: false, error: "descripción inválida" })
            // }
            // if (typeof price !== "number" || price < 0) {
            //     return res.status(400).json({ succes: false, error: "precio inválido(debe ser mayor a 0)" })
            // }
            // if (typeof stock !== "number" || stock < 0) {
            //     return res.status(400).json({ succes: false, error: "stock inválido (no puede ser negativo)" })
            // }
            // if (!category || typeof category !== "string") {
            //     return res.status(400).json({ succes: false, error: "categoria inválida" })
            // }
            // cuando paso las validaciones creamos el producto
            const newProduct = new Product({  // Product es el model que toma schema y schema toma a interface
                //id: products.length + 1,        // lo sacamos porque mongo nos da objectId.
                name,                            //resumido pq sino seria name: body.name
                description,
                stock,
                category,
                price
            })
            await newProduct.save()  //metodo mongoose model /await
            res.status(201).json(newProduct) // status 201 es nuevo recurso

        } catch (e) {
            const error = e as Error
            res.status(500).json({ error: error.message })
        }
    }
    // UPDATE
    static updateProduct = async (req: Request, res: Response): Promise<void | Response> => {  //se reemplaza const x STATIC de CLASS

        try {
            const { id } = req.params    // RESTRUCTURING de: const id = req.params.id  //el parametro URL id
            const { body } = req // RESTRUCTURING de  const body = req.body  // el object enviado en el body

            if (!Types.ObjectId.isValid(id)) res.status(400).json({ succes: false, error: "ID Inválido" }); //return omitido por tener 1 linea, Types.ObjectId analiza esto, .isValid es un operador true false que analiza si esta ok el id

            const validator = updateProductSchema.safeParse(body)//ZOD compara el z.object en una de sus key con la qkey del(req.body)/su resultado da un obect { succes:bolean, data:{}}
            console.log(validator)
            if (!validator.success) {  //validator arroja {success:true/false, data:{ ..., ..., ...}}
                return res.status(400).json(validator.error.flatten().fieldErrors) //.flaten() simplifica el msj error y .field()organiza el msj por campos
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, validator.data, { new: true }) //1 doc a modificar,2 datos a modificar, 3 config extra new:true le dice a mongoose que muestre no lo viejo sino lo actualizado lo nuevo

            if (!updatedProduct) {    //valida si existe el producto el id es correcto pero si tiene algo dentro
                return res.status(404).json({ error: "Producto no encontrado" })
            }
            res.json(updatedProduct)
        } catch (e) {
            const error = e as Error
            res.status(500).json({ error: error.message })
        }
    }
    // DETELE
    static deleteProduct = async (req: Request, res: Response): Promise<void | Response> => { //se reemplaza const x STATIC de CLASS

        try {
            const id = req.params.id // ya parseado a js en productRouter.use(express.json())
            if (!Types.ObjectId.isValid(id)) {                           //sintáxis de mongoose
                return res.status(400).json({ succes: false, error: "ID Inválido" })  //capturamos error al principio para evitar que siga el proceso
            }
            const product = await Product.findByIdAndDelete(id)   //findByIdAndDelete sintaxis mongoose
            if (!product) {  //agregado al ultimo p req de productos inexistentes o ya borrados
                return res.status(404).json({ succes: false, error: "Producto no encontrado" })
            }
            res.json(product)

        } catch (e) {
            const error = e as Error  //typescripto obliga que si declaramos error luego lo usemos en error.message, y no solo un string
            res.status(500).json({ error: error.message })
        }
    }
}

// EXPORT
export default ProductController //ya no exportamos 1x1 los controladores sino la CLASS que los contiene