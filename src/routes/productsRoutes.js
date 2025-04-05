const express = require("express")
const router = express.Router();
const verifyToken = require("../middleware/authmiddleware")
const { createProduct, updateProduct, removeProduct, getAllProducts, getProductsById, searchProducts } = require("../controllers/productsController")

router.post("/create-product", verifyToken, createProduct)
router.put("/edit-product", verifyToken, updateProduct)
router.delete("/delete-product", verifyToken, removeProduct)
router.get("/get-Products", getAllProducts)
router.get("/get-Products-details/:productId", getProductsById)
router.get("/get-Products-search", searchProducts)
module.exports = router;