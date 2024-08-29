import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const connectDB = async () => {
    try {
        // console.log(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(process.env.MONGODB_URI)
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB Connected! DB Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection juhi ", error);
        process.exit(1)
    }
}

export default connectDB