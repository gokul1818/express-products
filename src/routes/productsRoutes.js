const express = require("express")
const router = express.Router();

const { createProduct, updateProduct, removeProduct } = require("../controllers/productsController")

router.post("/create-product", createProduct)
router.post("/edit-product", updateProduct)
router.post("/delete-product", removeProduct)

module.exports = router;