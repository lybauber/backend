import CartsManager from "../dao/dbManagers/CartManagerDB.js";

const cartManager = new CartsManager();


export const getCarts = async () => {
        const carts = await cartManager.getCarts();
        res.send(carts);
    }

export const  newCart = async () => {
        const cart = await cartManager.createCart();
        res.send(newCart);
    }

