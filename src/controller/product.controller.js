import ProductManagerDB from "../dao/dbManagers/ProductManagerDB.js"



const productManager = new ProductManagerDB();


class ProductController {

    getProducts = async () => {
        const products = await productManager.getProducts();
        return products
    }

    createProduct = async (product) => {
        const newProduct = await productManager.createProduct(product);
        return newProduct;
    }

    getProductById = async (id) => {
        const product = await productManager.getProductById(id);
        return product;
    }

    updateProduct = async (id, product) => {
        const updatedProduct = await productManager.updateProduct(id, product);
        return updatedProduct;
    }
    deleteProduct = async (id) => {
        const deletedProduct = await productManager.deleteProduct(id);
        return deletedProduct; 
    }
}

export default ProductController;