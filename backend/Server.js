import express from 'express';
import connectDB from './config/ConnectDB.js';
import authRoute from './routes/authRoute.js';
import footprintRoute from './routes/footprintRoute.js'
import gamificationRoute from './routes/gamificationRoute.js'
import billRoute from './routes/bill.js'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;


// Initialize Express app
const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoute);
app.use("/api/footprint", footprintRoute);
app.use("/api/gamification", gamificationRoute);
app.use("/api/bill", billRoute);

    
// test route 

app.get("/", (req, res) => {
    console.log(" ");
});

// start server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});