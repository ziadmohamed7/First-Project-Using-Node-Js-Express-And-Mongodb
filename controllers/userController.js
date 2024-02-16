const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = "dipesh123";


const registerUser =asyncHandler(async (req,res)=>{
    const {name , email , password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    const checkUser = await User.findOne({email}) ;
    const hashedPassword = await bcrypt.hash(password,10);
    // console.log(hashedPassword);
    if (checkUser){
        res.status(400);
        throw new Error("Email is already exist ! ");
    }
    
    const user = User.create({
        name,
        email,
        password:hashedPassword
    });
    res.status(201).json(user);
});

const loginUser = asyncHandler(async(req,res)=>{
    const {  email , password} = req.body;
    if( !email || !password){
        
        res.status(400);
        throw new Error("All fields are mandatory  !");
    }
    
    const user = await User.findOne({email}) ;
    if(user && (await bcrypt.compare(password,user.password))){
        
        const accessToken = jwt.sign({
            user:{
                name:user.name,
                email:user.email,
                id:user.id
            }
        },
            ACCESS_TOKEN_SECRET,
            {expiresIn:"15m"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid !");
        
    }
});

const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
});

module.exports = {registerUser,loginUser,currentUser};