// import express from 'express';
const express = require('express');
const connectDB = require('./config/ConnectDB.js');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' }); 
const path = require('path');
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