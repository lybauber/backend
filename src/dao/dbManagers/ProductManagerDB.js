import productModel from "../models/products.models.js";

class ProductManagerDB {
    getProducts = async () => {
        try {
            
             const products = await productModel.find();
           
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) => {
        try {
            const product = await productModel.findById(id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    createProduct = async (product) => {
        try {
            const newProduct = new productModel(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (id, product) => {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(id, product, { runValidators: true, new: true });
            return updatedProduct;
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) => {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(id);
            return deletedProduct;
        
        }
        catch (error) {
            console.log(error);
        }
    }
}


export default ProductManagerDB;