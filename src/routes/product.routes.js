// src/routes/productRoutes.js
const express = require("express");
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../contorllers/product.controller");
const router = express.Router();

router.post("/createProduct", createProduct);
router.get("/GetAllProducts", getProducts);
router.put("/UptadeProduct/:id", updateProduct);
router.delete("/DeleteProduct/:id", deleteProduct);

module.exports = router;