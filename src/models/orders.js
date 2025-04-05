const mongoose = require("mongoose");

ordersSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
    },
    productsDetails: [
        {
            productId: String,
            productName: String,
            productPrice: Number,
            productQuantity: Number,
            productImage: String,
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        default: "Pending",
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        default: "Pending",
    },
    trackingId: {
        type: String,
        default: null,
    },
    trackingStatus: {
        type: String,
        default: null,
    },
    deliveryDate: {
        type: Date,
        default: null,
    },
    isCancelled: {
        type: Boolean,
        default: false,
    },
    cancellationReason: {
        type: String,
        default: null,
    },
    isReturned: {
        type: Boolean,
        default: false,
    },
    returnReason: {
        type: String,
        default: null,
    },
    isRefunded: {
        type: Boolean,
        default: false,
    },
    refundAmount: {
        type: Number,
        default: 0,
    },
    refundDate: {
        type: Date,
        default: null,
    },
    returnDate: {
        type: Date,
        default: null,
    },
    returnStatus: {
        type: String,
        default: null,
    },
    orderHistory: [
        {
            status: String,
            date: Date,
        }
    ],
});

module.exports = mongoose.model("Orders", ordersSchema);
