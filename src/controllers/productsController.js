const Products = require("../models/products");
const mongoose = require("mongoose");
const ReviewsModel = require("../models/review");

const createProduct = async (req, res) => {
    try {
        const { productName, productDescription, mrpPrice, productPrice, productCategory, productImage, productStock, productsSpecification, productChart, combo, productNetQuantity } = req.body;
        // Validate request body
        if (!productName || !productDescription || !mrpPrice || !productPrice || !productCategory || !productImage || !productStock || !productNetQuantity) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        await Products.create({
            productName,
            productDescription,
            mrpPrice,
            productPrice,
            productCategory,
            productImage,
            productStock,
            productsSpecification,
            productChart,
            combo,
            productNetQuantity
        });
        res.status(201).json({ message: "Product created successfully" });
    }
    catch (error) {
        console.log(error.message)
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find();
        if (products.length === 0) {
            return res.status(200).json({ products, message: "No products found" })
        }
        return res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
    }
}

const getProductsById = async (req, res) => {
    try {
        const { productId } = req.params;

        // Fetch product by ID with reviews
        const product = await Products.findOne({ productId })
        if (product.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        const reviews = await ReviewsModel.find({ productId: productId });

        return res.status(200).json({ ...product.toObject(), reviews }); // ✅ Return only the matched product

    } catch (error) {
        console.error("Error fetching product:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { productName, productDescription, mrpPrice, productPrice, productCategory, productImage, productStock, productsSpecification, productChart, combo, productNetQuantity } = req.body;

        await Products.findByIdAndUpdate(productId, {
            productName,
            productDescription,
            mrpPrice,
            productPrice,
            productCategory,
            productImage,
            productStock,
            productsSpecification,
            productChart,
            combo,
            productNetQuantity
        });
        res.status(200).json({ message: "Product updated successfully" });

    } catch (error) {
        console.log(error.message)
    }
}
const removeProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        await Products.findByIdAndDelete(productId);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = { createProduct, updateProduct, removeProduct, getAllProducts, getProductsById }