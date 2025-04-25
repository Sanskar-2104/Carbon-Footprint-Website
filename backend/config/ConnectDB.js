import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => { 
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connnected!"))
        .catch((err) => console.log(err));

}

export default connectDB;
