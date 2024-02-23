import productModel from "../../models/products.models.js";

export class ProductsMongo{
    constructor(){
        this.model = productModel
    }
    async get(){
        try{
            return await this.model.find()
        }catch(error){
            throw new Error(error)
        }
    }
    async getById(id){
        try{
            const product = await this.model.findById(id)
            if(!product){
                throw new Error(`Producto con id ${id} no encontrado`)
            }
            return product
        }catch(error){
            throw new Error(error)
        }
    }
    async create(product){
        try{
            return await this.model.create(product)
        
        }catch(error){
            throw new Error(error)
        }
    }
    async update(id, product){
        try{
            return await this.model.findByIdAndUpdate(id, product, {new: true})
        }catch(error){
            throw new Error(error)
        }
    }
    async delete(id){
        try{
            return await this.model.findByIdAndDelete(id)
        }catch(error){
            throw new Error(error)
        }
    }
}