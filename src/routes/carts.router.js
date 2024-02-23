import { Router } from "express";
import { getCarts, newCart } from "../controller/cart.controller.js";




const router = Router();


router.get("/carts",getCarts);

router.post("/carts", newCart);


export {router as cartRouter};