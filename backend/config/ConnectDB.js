import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const connectDB = async () => { 
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log("MongoDB Connnected!"))
        .catch((err) => console.log(err));

}

export default connectDB;
