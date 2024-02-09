import { Router } from "express";
import cartController from "../controller/cart.controller.js";



const router = Router();

const cartManager = new cartController();

router.get("/carts", async (req, res) => {
    const carts = await cartManager.getCarts();
  res.send(carts);

})

router.post("/carts", async (req, res) => {
    const newCart = await cartManager.createCart();
    res.send(newCart);

})


export {router as cartRouter};