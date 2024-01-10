import { Router } from "express";
import CartsManager from "../dao/dbManagers/CartManagerDB.js";


const router = Router();

const cartManager = new CartsManager();

router.get("/carts", async (req, res) => {
    const carts = await cartManager.getCarts();
  res.send(carts);

})

router.post("/carts", async (req, res) => {
    const newCart = await cartManager.createCart();
    res.send(newCart);

})


export {router as cartRouter};