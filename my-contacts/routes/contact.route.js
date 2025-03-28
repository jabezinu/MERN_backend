const express = require("express");
const { getContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contact.controller");

const contactRouter = express.Router();

contactRouter.route("/").get(getContacts)
contactRouter.route("/").post(createContact)
contactRouter.route("/:id").get(getContact)
contactRouter.route("/:id").put(updateContact)
contactRouter.route("/:id").delete(deleteContact)

module.exports = contactRouter