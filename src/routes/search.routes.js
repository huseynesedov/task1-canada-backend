const express = require("express");
const { searchProducts, searchSchools } = require("../controllers/search.controller");

const router = express.Router();

router.post("/searchByProducts", searchProducts);
router.post("/searchBySchools", searchSchools);

module.exports = router;