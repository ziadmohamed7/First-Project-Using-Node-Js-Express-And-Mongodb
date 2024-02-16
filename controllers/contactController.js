// another way like try and catch 
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")
//@desc 
//@route Get /api/contacts
//@access public

const getContacts = asyncHandler(async(req,res)=>{
        const contacts = await Contact.find({user_id:req.user.id});
                res.status(200).json(contacts); 
});

//@desc 
//@route Get /api/contacts/:id
//@access public

const getContactUsingId = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("contact not found !");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("User don`t have a permission to update other user contacts !");
        }
    res.status(200).json(contact);
        
});

//@desc 
//@route post /api/contacts
//@access public

const createContacts = asyncHandler(async(req,res)=>{

        console.log(req.body);
        const {name , email , phoneNumber , address} = req.body;
        if (!name || !email || !phoneNumber || !address){
                res.status(400);
                throw new Error("All fields are mandatory !");
        }

        const contact = Contact.create({
                name,
                email,
                phoneNumber,
                address,
                user_id:req.user.id
        });

        res.status(201).json(contact);
});

//@desc 
//@route delete /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
        
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
                res.status(404);
                throw new Error("Contact not found!");
        }
        if(contact.user_id.toString() !== req.user.id){
                res.status(401);
                throw new Error("User don`t have a permission to update other user contacts !");
        }
        await contact.deleteOne({_id:req.params.id});
        res.status(200).json(contact);
    });
    
    

//@desc 
//@route put /api/contacts/:id
//@access public

const updateContact = asyncHandler(async(req,res)=>{
       
        const contact = await Contact.findById(req.params.id);
        if (!contact){
            res.status(404);
            throw new Error("contact not found !");
        }

        if(contact.user_id.toString() !== req.user.id){
                res.status(401);
                throw new Error("User don`t have a permission to update other user contacts !");
        }
        const updatedContact = await Contact.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new:true},
        );

        res.status(200).json(updatedContact);
});


module.exports = {getContacts,getContactUsingId,createContacts,deleteContact,updateContact};