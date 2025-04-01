const express = require("express");
const { getContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contact.controller");
const validateToken = require("../middleware/validateTokenHandler");

const contactRouter = express.Router();

contactRouter.use(validateToken)
contactRouter.route("/").get(getContacts).post(createContact)
contactRouter.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

module.exports = contactRouter