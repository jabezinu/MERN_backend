const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/user.controller");
const validateToken = require("../middleware/validateTokenHandler");

const userRouter = express.Router();

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/current").get(validateToken, currentUser)

module.exports = userRouter