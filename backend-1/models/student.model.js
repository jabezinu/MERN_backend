const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please fill the student name"]
    },
    email: {
        type: String,
        required: [true, "Please fill the student email address"]
    },
    phone: {
        type: Number,
        required: [true, "Please fill the student phone number"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Student", studentSchema)