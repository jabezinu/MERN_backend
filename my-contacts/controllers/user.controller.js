const asyncHandler = require('express-async-handler'); 
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//@desc Register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Fill all three fields");
    }
    
    const filter = await User.findOne({email})
    if(filter){
        res.status(400);
        throw new Error("User already exists");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    
    if(user){
        res.status(201).json({user:{email: user.email, _id: user.id}})
    }else{
        res.status(400);
        throw new Error("user data is not valid");
    }
})
//@desc Login user 
//@route POST /api/users/login
//@access public 
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email, !password){
        res.status(400);
        throw new Error("Fill both the email and password");
    }

    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = await jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user._id
            }
        },
        process.env.ACCESS_TOKEN_SECCRET,
        {expiresIn: '1h'}
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401);
        throw new Error("worong email or password");
    }
})
//@desc Get current user profile
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})

module.exports = {registerUser, loginUser, currentUser}