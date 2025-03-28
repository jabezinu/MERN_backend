import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected: ", conn.connection.name)
    } catch (err) {
        console.log("Error:", err.message);
        process.exit(1)
    }
}

export default connectDB;