const mongoose = require("mongoose");

const contactSchema =  mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true , "please add the contact name !"]
    },

    email:{
        type:String,
        required:[true , "please add the contact email !"]
    },

    phoneNumber:{
        type:String,
        required:[true , "please add the contact mobile number !"]
    },

    address:{
        type:String,
        required:[true  , "please add the contact  address !"]
    }

},{
    timestamps : true,
}); 

module.exports = mongoose.model("contact",contactSchema);