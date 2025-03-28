const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_STR)
        console.log("Database name is:", conn.connection.name, conn.connection.host)
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectDb