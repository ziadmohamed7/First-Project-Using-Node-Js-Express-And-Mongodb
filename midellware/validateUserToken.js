const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ACCESS_TOKEN_SECRET = "dipesh123";

const validateToken = asyncHandler(async(req,res,next)=>{

    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing !");
        }

        jwt.verify(token,ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized !");
            }
            req.user = decoded.user;
            next();
        });
    }
});

module.exports = validateToken;