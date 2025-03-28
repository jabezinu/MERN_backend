const asyncHandler = require("express-async-handler");
const Student = require("../models/student.model");

//@desc Get all students
//@route GET /api/students
//@access public
const getStudents = asyncHandler(async(req, res) => {
    const student = await Student.find();

    res.json(student)
})

//@desc Create student
//@route POST /api/students
//@access public
const createStudent = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All three field should be filled");
    }
    
    const emailFilter = await Student.findOne({email})
    if(emailFilter){
        res.status(400);
        throw new Error("student already exit.");
    }
    
    const student = await Student.create({
        name,
        email,
        phone
    })

    res.status(201).json(student)
})

//@desc Update student
//@route PUT /api/students
//@access public
const updateStudent = asyncHandler(async(req, res) => {
    const student = await Student.findById(req.params.id);
    if(!student){
        res.status(400);
        throw new Error("no such student.");
    }
    
    const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.json(updatedStudent)
})

//@desc Delte student
//@route DELETE /api/students
//@access public
const deleteStudent = asyncHandler(async(req, res) => {
    const student = await Student.findById(req.params.id);
    if(!student){
        res.status(400);
        throw new Error("no such student.");
    }
    const deletedStudent = await Student.findByIdAndDelete(
        req.params.id,
        {new: true}
    );
    res.json(deletedStudent)
})

module.exports = {getStudents, createStudent, updateStudent, deleteStudent}