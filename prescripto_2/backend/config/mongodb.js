import mongoose from "mongoose";

const connectDB = async () => {

    // mongoose.connection.on('connected', () => console.log("Database connected"));

    // await mongoose.connect(`${process.env.MONGODB_URI}`)
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected: ", conn.connection.host);        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


export default connectDB