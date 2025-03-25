const express = require("express");
const router = require("./routes/contact.route");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/connctDb");
const dotenv = require("dotenv").config();

const app = express();

connectDb();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", router);
app.use(errorHandler)

app.listen(port, () => {
    console.log("server is running on port: ", port);
})