import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    role:{
        type: String,
        default: 'user'
    },
    cart: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'users'
            }
        ]
    }
})

const userModel = mongoose.model('users', userSchema)

export default userModel;