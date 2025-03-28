const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/current").get(currentUser)

module.exports = userRouter