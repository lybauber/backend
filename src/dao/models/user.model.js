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
            type: mongoose.Schema.Types.ObjectId,
            ref:'cart'
    }
})

const userModel = mongoose.model('users', userSchema)

export default userModel;