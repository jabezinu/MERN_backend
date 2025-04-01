const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name:{
        type: String,
        requried: [true, "Please file the contact name"]
    },
    email:{
        type: String,
        requried: [true, "Please file the contact name"]
    },
    phone:{
        type: String,
        requried: [true, "Please file the contact name"]
    }
},{
    timestams: true
})

module.exports = mongoose.model("Contact", contactSchema)