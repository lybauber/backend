import CartsManager from "../dao/dbManagers/CartManagerDB.js";

const cartManager = new CartsManager();


class cartController {
    getCarts = async () => {
        const carts = await cartManager.getCarts();
        return carts;
    }

    newCart = async () => {
        const cart = await cartManager.newCart();
        return cart; 
    }
}

export default cartController;