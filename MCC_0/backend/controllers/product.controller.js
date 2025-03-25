import mongoose from "mongoose";
import Product from "../models/product.model.js";

//@desc Get all Products
//@route GET /api/products
//@access 
const getProducts = async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json({success: true, data: product})
    } catch (err) {
        console.log("error in fetching products:", err.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

//@desc Create Product
//@route PSOT /api/products
//@access 
const createProduct =  async(req, res) => {
    const product = req.body;
    
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success: false, mesasage: "Please provide all fields"})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct})
    } catch (err) {
        console.log("Error in creating product: ", err.message)
        res.status(500).json({success: false, message: "server Error"})
    }
}

//@desc Update Product
//@route UPDATE /api/products/:id
//@access public
const updateProduct = async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({success: false, message: "Invalid product Id"})
        }
    
        const product = req.body;
        
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            product,
            {new: true}
        );

        if (!updatedProduct) {
            return res.status(404).json({success: false, message: "Product not found"})
        }
        
        res.status(200).json({success: true, data: updatedProduct})
    } catch (err) {
        console.log("Error in updating product: ", err.message);
        res.status(500).json({success: false, message: "Server Error"})
    }
}


//@desc delete Product
//@route DELETE /api/products/:id
//@access public
const deleteProduct = async(req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if(deletedProduct){
            res.status(200).json({success: true, data: deletedProduct})
        }
    } catch (err) {
        console.log("error in deleting product:", err.message)
        res.status(404).json({ success: false, message: "Product not found"})
    }
}

export { getProducts, createProduct, updateProduct, deleteProduct };
