import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinar.js';


//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors())

//api endpints
app.get('/', (req, res) => {
    res.send('API working fine')
})

app.listen(port, () => console.log("Server Started", port));