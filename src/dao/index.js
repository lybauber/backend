import { connectDB } from "../config/dbConnection.js";
import { ProductsMongo } from "./dbManagers/mongo/products.mongo.js";

connectDB();

export const productsDao = new ProductsMongo();