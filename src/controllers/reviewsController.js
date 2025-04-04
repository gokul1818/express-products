const ReviewsModel = require("../models/review")
const User = require("../models/user")

const getProductReviews = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await ReviewsModel.find({ productId });
        if (reviews.length === 0) {
            return res.status(200).json({ message: "No reviews found" });
        }
        return res.status(200).json({ reviews });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Server error" });
    }
}

const createProductReview = async (req, res) => {
    try {
        const { userId, productId, review, rating } = req.body;
        if (!userId || !productId || !review || !rating) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const userName = await User.findOne({ id: userId });
        if (!userName) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log('userName: ', userName.name);
        await ReviewsModel.create({
            userId,
            productId,
            userName: userName?.name,
            review,
            rating,
        });
        return res.status(201).json({ message: "Review created successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = { getProductReviews, createProductReview }