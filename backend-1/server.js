const express = require("express");
const router = require("./routes/student.route");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/db");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/api/students", router)
app.use(errorHandler)


app.listen(port, () => {
    console.log("server is running on port ", port)
})