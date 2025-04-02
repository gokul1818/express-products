const mongoose = require("mongoose");
const generateUniqueId = require("../utils/createId");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    mrpPrice: {
        type: Number,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    productImage: [{
        type: String,
        required: true,
    }],
    productId: {
        type: String,
        default: generateUniqueId.generateUniqueId,
    },
    productStock: {
        type: Number,
        required: true,
    },
    productsSpecification: [
        {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
        }
    ],
    productChart: {
        type: String,
    }
})

const Product = mongoose.model("Products", productSchema);
module.exports = Product;