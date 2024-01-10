import {Router} from 'express';
import ProductManagerDB from '../dao/dbManagers/ProductManagerDB.js';



const router = Router();    
const productManager = new ProductManagerDB();




router.get('/products', async (req,res)=>{
      
    const products = await productManager.getProducts();
    
    res.render('products/index', { products});

})


router.get('/products/new', (req,res)=>{
    res.render('products/new');
})

router.post('/products', async (req,res)=>{
    const newProduct = await productManager.createProduct(req.body);
    res.redirect(`/products/${newProduct._id}`);
})

router.get('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const product = await productManager.getProductById(id);
    
    res.render('products/details', {product});
})

router.get('/products/:id/edit', async (req,res)=>{
    const {id} = req.params;
    const product = await productManager.getProductById(id);
    res.render('products/edit', {product});

})

router.put('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const product = await productManager.updateProduct(id, req.body);
    res.redirect(`/products/${product._id}`);

})

router.delete('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const product = await productManager.deleteProduct(id);
    res.redirect('/products');
})



export {router as productRouter};