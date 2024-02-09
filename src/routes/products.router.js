import {Router} from 'express';
// import ProductManagerDB from '../dao/dbManagers/ProductManagerDB.js';
import ProductController from '../controller/product.controller.js';



const router = Router();    
// const productManager = new ProductManagerDB();
const productsController = new ProductController();




router.get('/products', async (req,res)=>{
    // const products = await productManager.getProducts();
    const products = await productsController.getProducts();
    
    res.render('products/index', { products});

})


router.get('/products/new', (req,res)=>{
    res.render('products/new');
})

router.post('/products', async (req,res)=>{
    const newProduct = await productsController.createProduct(req.body);
    res.redirect(`/api/products/${newProduct._id}`);
})

router.get('/products/:id', async (req,res)=>{
    // const {id} = req.params;
    // const product = await productManager.getProductById(id);
    const product = await productsController.getProductById(req.params.id);
    
    res.render('products/details', {product});
})

router.get('/products/:id/edit', async (req,res)=>{
    // const {id} = req.params;
    // const product = await productManager.getProductById(id);
    const product = await productsController.getProductById(req.params.id);
    res.render('products/edit', {product});

})

router.put('/products/:id', async (req,res)=>{
    // const {id} = req.params;
    // const product = await productManager.updateProduct(id, req.body);
    const product = await productsController.updateProduct(req.params.id, req.body);
    res.redirect(`/api/products/${product._id}`);

})

router.delete('/products/:id', async (req,res)=>{
    // const {id} = req.params;
    // const product = await productManager.deleteProduct(id);
    await productsController.deleteProduct(req.params.id);
    res.redirect('/api/products');
})



export {router as productRouter};