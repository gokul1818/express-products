const Products = require("../models/products");

const createProduct = async (req, res) => {
    try {
        const { productName, productDescription, mrpPrice, productPrice, productCategory, productImage, productStock, productsSpecification, productChart } = req.body;
        // Validate request body
        if (!productName || !productDescription || !mrpPrice || !productPrice || !productCategory || !productImage || !productStock) {
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
            productChart
        });
        res.status(201).json({ message: "Product created successfully" });
    }
    catch (error) {
        console.log(error.message)
    }
}


const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { productName, productDescription, mrpPrice, productPrice, productCategory, productImage, productStock, productsSpecification, productChart } = req.body;

        await Products.findByIdAndUpdate(productId, {
            productName,
            productDescription,
            mrpPrice,
            productPrice,
            productCategory,
            productImage,
            productStock,
            productsSpecification,
            productChart
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
module.exports = { createProduct, updateProduct, removeProduct }