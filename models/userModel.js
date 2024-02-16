const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
       
        name:{
            type:String,
            require:[true , "UserName is required"]
        },

        email:{
            type:String,
            require:[true , "email is required"],
            unique:[true , "Email address is already taken !"]
        },

        password:{
            type:String,
            require:[true , "password is required"]
        },
    },{
        timestamps:true,
    }
); 

module.exports = mongoose.model("User",userSchema);