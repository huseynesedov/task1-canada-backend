// src/routes/productRoutes.js
const express = require("express");
const router = express.Router();

const product = './product.routes'
const catalog = './catalog.rotues'
const search = './search.routes'

router.post("/product", product);
router.get("/catalog", catalog);
router.put("/search", search);

module.exports = router;