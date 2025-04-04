// src/routes/productRoutes.js
const express = require("express");
const router = express.Router();

const productRoutes = require("./product.routes");
const schoolRoutes = require("./school.route");

const catalogRoutes = require("./catalog.routes");
const searchRoutes = require("./search.routes");

router.use("/Product", productRoutes);
router.use("/School", schoolRoutes);
router.use("/Catalog", catalogRoutes);
router.use("/Search", searchRoutes);

module.exports = router;
