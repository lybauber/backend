import mongoose from "mongoose";
import productModel from "./src/dao/models/products.models.js";

mongoose.connect("mongodb+srv://lybauber:colombia123@dbprueba.6vwlw9c.mongodb.net/ecommerce")

const seedProducts = [
    {
        title: "Product 1",
        description: "Description 1",
        price: 100,
        thumbnail: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        code: "ABC123",
        stock: 10,
        category: "Phones",

    },
    {
        title: "Product 2",
        description: "Description 2",
        price: 200,
        thumbnail: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        code: "ABC456",
        stock: 20,
        category: "Videogames",
    },
    {
        title: "Product 3",
        description: "Description 3",
        price: 300,
        thumbnail: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        code: "ABC789",
        stock: 30,
        category: "Home",
    },
    {
        title: "Product 4",
        description: "Description 4",   
        price: 400,
        thumbnail: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        code: "ABC012",
        stock: 40,
        category: "Phones"
    },
    {
        title: "Product 5",
        description: "Description 5",
        price: 500,
        thumbnail: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        code: "ABC345",
        stock: 50,
        category: "Home"
    },
    {
        title: "Product 6",
        description: "Description 6",
        price: 600,
        thumbnail: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        code: "ABC678",
        stock: 60,
        category: "Videogames"
    },
    {
        title: "Product 7",
        description: "Description 7",
        price: 700,
        thumbnail: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        code: "ABC901",
        stock: 70,
        category: "Home"
    },
    {
        title: "Product 8",
        description: "Description 8",
        price: 800,
        thumbnail: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        code: "ABC234",
        stock: 80,
        category: "Phones"
    }
]

productModel.insertMany(seedProducts);