// src/routes/productRoutes.js
const express = require("express");
const router = express.Router();

const productRoutes = require("./product.routes");
const catalogRoutes = require("./catalog.routes");  // Corrected typo
const searchRoutes = require("./search.routes");

router.use("/Product", productRoutes);
router.use("/Catalog", catalogRoutes);
router.use("/Search", searchRoutes);

module.exports = router;
