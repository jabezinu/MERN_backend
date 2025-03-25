import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async(req, res) => {

    try {
        const product = await Product.find();
    
        res.status(200).json({success: true, data: product})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: error.message})
    }
}
export const createProduct = async (req, res) => {
    const {name, price, image} = req.body;
    
    if(!name || !price || !image){
        return res.status(400).json({success: false, message: "Please fill all fields!"})
    }
    
    try {
        const product = await Product.create({name, price, image});
        res.status(201).json({success: true, data: product})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: "server error"})
    }
}
export const updateProduct = async(req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.status(500).json({success: false, message: error.message})
        }
        
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        
        if(product){
            res.status(200).json({success: true, data: product})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: error.message})
    }  
}

export const deleteProduct = async(req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.status(500).json({success: false, message: error.message})
        }

        if(!deletedProduct){
            return res.status(400).json({success: false, message: "no such product"})
        }
        res.status(200).json({success: true, message: "product deleted"})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: error.message})
    }
}
