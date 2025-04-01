const asyncHandler = require("express-async-handler");
const Contact = require("../models/contacts.model");
const mongoose = require("mongoose");
const userModel = require("../models/user.model");

//@desc Get all contacts
//@route GET /api/contacts
//access private
const getContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find({user_id: req.user.id});

    res.status(200).json(contact)
})
//@desc create contact 
//@route POST /api/contacts
//access private
const createContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body;

    if(!name || !email || !phone){
        res.status(400);
        throw new Error("fill all fields");
    }
    
    const filterPhone = await Contact.findOne({phone, user_id: req.user.id})
    if(filterPhone){
        res.status(400);
        throw new Error("already exits");
    }
    
    const contact = await Contact.create({
        user_id: req.user.id,
        name,
        email,
        phone
    })
    
    if(contact){
        res.status(201).json(contact);
    }
})
//@desc Get contact
//@route GET /api/contacts/:id
//access private
const getContact = asyncHandler (async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400);
        throw new Error("no such contact");
    }

    const contact = await Contact.findById(id);    
    if (contact.user_id == req.user.id) {
        res.status(200).json(contact)
    }else{
        res.status(403);
        throw new Error("you are not authrized to access this contact.")
    }
    
    
})

//@desc Update contact
//@route PUT /api/contacts/:id
//access private
const updateContact = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {phone} = req.body; // Extract phone from req.body
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(401);
        throw new Error("no such contact");
    }
    
    const filterPhone = await Contact.findOne({phone});
    if(filterPhone.user_id == req.user.id){
        res.status(400);
        throw new Error("already exists");
    }
    
    let updatedContact;
    const contact = await Contact.findById(id);    
    if (contact.user_id == req.user.id){
        updatedContact = await Contact.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );
    }else{
        res.status(403);
        throw new Error("you are not authrized to access this contact.")
    }
    if(!updatedContact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.json(updatedContact);
})

//@desc Get all contact
//@route GET /api/contacts
//access private
const deleteContact = asyncHandler(async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(401);
        throw new Error("no such contact");
    }
    
    const contact = await Contact.findByIdAndDelete(id)
    if(contact){
        res.json({message: "contact is deleted", data: contact} )
    }
})

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact}