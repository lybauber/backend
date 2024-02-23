import mongoose from "mongoose";
import {config} from "./config.js"

export const connectDB = async () => {
    try {
        const db = await mongoose.connect(config.mongo.url);
        console.log("Connected to MongoDB");
        return db;
    } catch (error) {
        console.log(error);
    }
    return null;
}