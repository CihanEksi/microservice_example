const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to MongoDB");
    }
    ).catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });
}

module.exports = dbConnection;