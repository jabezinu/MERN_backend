import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';
import productsRouter from './routes/product.route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json())

app.use("/api/products", productsRouter)

app.listen(PORT, async() => {
    await connectDb()
    console.log("Server is running on port: http://localhost:", PORT)
})
