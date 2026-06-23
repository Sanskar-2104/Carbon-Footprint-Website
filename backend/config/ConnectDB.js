import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI environment variable is not set');
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

export default connectDB;
