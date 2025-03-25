const mongoose = require("mongoose")

const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database name is:", conn.connection.name)
    } catch (err) {
        console.log("Error: ", err.message)
        process.exit(1)
    }
}

module.exports = connectDb;