import {z} from "zod"

const productSchemaValidator = z.object({    // crea un objeto un z.object
    name: z.string().min(4),
    description: z.string().min(10),
    price:z.number().positive(),
    category:z.string().min(2),
    stock: z.number().positive()
})

export const createProductSchema = productSchemaValidator 
export const updateProductSchema= productSchemaValidator.partial() // para actualizar productos en una de sus prop o keys, no todo