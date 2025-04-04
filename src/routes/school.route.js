// src/routes/SchoolRoutes.js
const express = require("express");
const { createSchool, getAllSchools, getSchoolById, updateSchool, deleteSchool } = require("../controllers/school.controller");
const router = express.Router();

router.post("/createSchool", createSchool);
router.get("/getAllSchools", getAllSchools);
router.put("/uptadeSchool/:id", updateSchool);
router.put("/getSchoolById/:id", getSchoolById);
router.delete("/deleteSchool/:id", deleteSchool);

module.exports = router;