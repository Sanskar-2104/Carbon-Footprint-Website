import express from 'express';
import connectDB from './config/ConnectDB.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const PORT = process.env.PORT;


// Initialize Express app
const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(cors());



    
// test route 

app.get("/", (req, res) => {
    console.log(" ");
});

// start server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});