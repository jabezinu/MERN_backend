const express = require("express");
const { getStudents, createStudent, updateStudent, deleteStudent } = require("../controllers/student.controller");

const router = express.Router();

router.route("/").get(getStudents)
router.route("/").post(createStudent)
router.route("/:id").put(updateStudent)
router.route("/:id").delete(deleteStudent)

module.exports = router