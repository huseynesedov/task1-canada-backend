const express = require("express");

const { searchProducts } = require("../controllers/search.controller");

const router = express.Router();
router.post("/SearchByProducts", searchProducts);
module.exports = router;