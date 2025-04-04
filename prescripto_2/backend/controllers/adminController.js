import validator from 'validator'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address} = req.body;
        const imageFile = req.file;

        // checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile){
            return res.status(400).json({sucess: false, message: "All fields are required"})
        }
        
        // validating email format
        if(!validator.isEmail(email)) {
            return res.status(400).json({sucess: false, message: "please enter valid email."})
        }
        
        // validateing strong password
        if(password.length < 8){
            return res.status(400).json({sucess: false, message: "please enter Stron password."})
        }
        
        // hashing Doctor's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt) 

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
        const imageUrl = imageUpload.secure_url
        
        // save into the DB
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save();

        res.json({success: true, message: "Doctor Added"})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API For admin Login
const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD ){
            
            const token = await jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success: true ,token})
            
        }else{
            return res.json({sucess: false, message: "Invalid credentials"})
            
        }

        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})        
    }
}

export{addDoctor, loginAdmin}