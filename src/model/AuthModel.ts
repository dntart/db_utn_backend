import { model, Model, Schema } from "mongoose"
import IUser from "../interfaces/IUsers"

//SCHEMA
const userSchema = new Schema<IUser>({   
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    versionKey: false
})
//MODEL
const User: Model<IUser> = model("User", userSchema)

//EXPORT
export default User

