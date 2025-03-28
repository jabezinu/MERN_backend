const asyncHandler = require("express-async-handler");
const Contact = require("../models/contacts.model");
const mongoose = require("mongoose");

//@desc Get all contacts
//@route GET /api/contacts
//access public
const getContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find({});

    if(contact){
        res.status(200).json(contact)
    }
})
//@desc create contact
//@route POST /api/contacts
//access public
const createContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body;

    if(!name || !email || !phone){
        res.status(400);
        throw new Error("fill all fields");
    }
    
    const filterPhone = await Contact.findOne({phone})
    if(filterPhone){
        res.status(400);
        throw new Error("already exits");
    }
    
    const contact = await Contact.create({
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
//access public
const getContact = asyncHandler (async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400);
        throw new Error("no such contact");
    }
    const contact = await Contact.findById(id);

    if (!contact) {
        res.status(404);
        throw new Error("no such contact")
    }

    res.status(200).json(contact)

})

//@desc Update contact
//@route PUT /api/contacts/:id
//access public
const updateContact = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {phone} = req.body; // Extract phone from req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(401);
        throw new Error("no such contact");
    }
    
    const filterPhone = await Contact.findOne({phone});
    if(filterPhone){
        res.status(400);
        throw new Error("already exists");
    }


    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        req.body,
        {new: true}
    );
    if(!updatedContact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.json(updatedContact);
})

//@desc Get all contact
//@route GET /api/contacts
//access public
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