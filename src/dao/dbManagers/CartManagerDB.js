import cartsModel from "../models/cart.models.js";
import productsModel from "../models/products.models.js";

class CartsManager {
    getCarts = async () => {
        const carts = await cartsModel.find();
        return carts;
    }

    getCartById = async (id) => {
        const carts = await cartsModel.findById({id});
        return carts;
    
    }

    createCart = async () => {
        const newCart = await cartsModel.create({});
        return newCart;
    
    }

    addProductToCart = async (cid, pid, quantity=1) => {
        const cart = await cartsModel.findone({_id:cid});
        if (!cart){
            return {
                status: error,
                msg: `Carrito #${cid} no existe`
            }
        };
        const product = await productsModel.findone({_id:pid});
        if (!product){
            return {
                status: error,
                msg: `Producto #${pid} no existe`
            }
        };

        let productCart = cart.products;

        const indexProduct = productCart.findIndex(p => p.product == pid);

        if(indexProduct != -1){
            const newProduct = {
                product: pid,
                quantity: quantity
            }
            cart.products.push(newProduct);

        } else {
            productCart[indexProduct].quantity += quantity;
        }
       
        await cart.save();
        return cart;
    }
}

export default CartsManager;