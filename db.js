const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbURL = process.env.MONGO_URL

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL)
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error.message)
        console.log("Database connection failed")

    }
};
module.exports = connectDB