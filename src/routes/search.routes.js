const express = require("express");

const { searchProducts } = require("../contorllers/search.controller");

const router = express.Router();
router.get("/SearchByProducts", searchProducts);
module.exports = router;