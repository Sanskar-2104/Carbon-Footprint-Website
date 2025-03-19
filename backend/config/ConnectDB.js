const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' }); 

const connectDB = async () => { 
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log("MongoDB Connnected!"))
        .catch((err) => console.log(err));

}
module.exports = connectDB;
