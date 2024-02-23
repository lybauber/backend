import ProductManagerDB from "../dao/dbManagers/ProductManagerDB.js"




const productManager = new ProductManagerDB();


export const index  = async (req, res) => {
            const products = await productManager.getProducts();
            res.render('products/index', { products});
        
  }

export const renderNewForm =  (req,res)=>{
    res.render('products/new');
}


export const createProduct = async (req,res)=>{
    const newProduct = await productManager.createProduct(req.body);
    res.redirect(`/api/products/${newProduct._id}`);
}
       
export const getProductById = async (req,res)=>{
    const {id} = req.params;
    const product = await productManager.getProductById(id);
    res.render('products/details', {product});
}


export const renderEditForm = async (req,res)=>{
    const {id} = req.params;
    const product = await productManager.getProductById(id);
    res.render('products/edit', {product});

}


export const updateProduct = async (req,res)=>{
    const {id} = req.params;
    const product = await productManager.updateProduct(id, req.body);
    res.redirect(`/api/products/${product._id}`);
}


export const deleteProduct = async (req,res)=>{
    const {id} = req.params;
    const product = await productManager.deleteProduct(id);
    res.redirect('/api/products');
}

  

