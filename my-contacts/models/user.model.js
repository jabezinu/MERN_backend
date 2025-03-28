const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "please fill the username"]
    },
    email:{
        type: String,
        required: [true, "please fill the email address"],
        unique: [true, "Email address already taken"]
    },
    password:{
        type: String,
        required: [true, "please fill the user password"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);