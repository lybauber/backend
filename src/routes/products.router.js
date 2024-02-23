import {Router} from 'express';
import {index, renderNewForm, createProduct, getProductById, renderEditForm, updateProduct, deleteProduct} from '../controller/product.controller.js';

import { checkRole, isLoggedIn } from '../middleware.js';

const router = Router();    

router.get('/products', index )


router.get('/products/new', renderNewForm)

router.post('/products', createProduct )

router.get('/products/:id', getProductById )

router.get('/products/:id/edit', checkRole(['admin']), renderEditForm)

router.put('/products/:id', updateProduct)

router.delete('/products/:id', deleteProduct)



export {router as productRouter};