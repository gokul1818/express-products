const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: false,
    },
    userName: {
        type: String,
        required: false
    },
    productId: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

reviewSchema.index({ userId: 1, productId: 1 }, { unique: false });
const ReviewsModel = mongoose.model("Reviews", reviewSchema)
module.exports = ReviewsModel