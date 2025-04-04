const mongoose = require("mongoose");
const generateUniqueId = require("../utils/createId");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensuring email uniqueness at the schema level
    },
    phoneNumber: {
        type: Number,
        required: false,
    },
    alternateNumber: {
        type: Number,
        required: false,
    },
    id: {
        type: String,
        default: generateUniqueId.generateUniqueId,
    },
    address: {
        doorNumber: {
            type: String,
            required: false,
        },
        street: {
            type: String,
            required: false,
        },
        landmark: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        state: {
            type: String,
            required: false,
        },
        pinCode: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: false,
            default: "India", // Change default as per your needs
        }
    }
});

// Ensure email is unique before saving
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("Users", userSchema);
module.exports = User;
