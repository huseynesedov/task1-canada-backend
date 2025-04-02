const express = require("express");
const router = express.Router();


const { createCatalogBed, getCatalogBeds, getCatalogByIdBed, updateCatalogBed, deleteCatalogBed } = require("../controllers/catalog.bed.controller");

const { createCatalogPrice, getCatalogPrices, getCatalogByIdPrice, updateCatalogPrice, deleteCatalogPrice } = require("../controllers/catalog.price.controller");

const { createCatalogBaths, getCatalogBaths, getCatalogByIdBaths, updateCatalogBaths, deleteCatalogBaths } = require("../controllers/catalog.baths.controller");


// CatalogBaths işlemleri
router.post("/createCatalogBath", createCatalogBaths);  // Yeni CatalogBaths oluştur
router.get("/getAllCatalogBaths", getCatalogBaths);    // Tüm CatalogBaths'ları getir
router.get("/getCatalogBathById/:id", getCatalogByIdBaths); // Belirli bir CatalogBaths getir
router.put("/uptadeCatalogBath/:id", updateCatalogBaths); // CatalogBaths güncelle
router.delete("/deleteCatalogBath/:id", deleteCatalogBaths); // CatalogBaths sil

// CatalogPrice işlemleri
router.post("/createCatalogPrice", createCatalogPrice);  // Yeni CatalogPrice oluştur
router.get("/getAllCatalogPrices", getCatalogPrices);    // Tüm CatalogPrice'ları getir
router.get("/getCatalogPriceById/:id", getCatalogByIdPrice); // Belirli bir CatalogPrice getir
router.put("/updateCatalogPrice/:id", updateCatalogPrice); // CatalogPrice güncelle
router.delete("/deleteCatalogPrice/:id", deleteCatalogPrice); // CatalogPrice sil

// CatalogBed işlemleri
router.post("/createCatalogBed", createCatalogBed);  // Yeni CatalogBed oluştur
router.get("/getAllCatalogBeds", getCatalogBeds);    // Tüm CatalogBed'leri getir
router.get("/getCatalogBedById/:id", getCatalogByIdBed); // Belirli bir CatalogBed getir
router.put("/uptadeCatalogBed/:id", updateCatalogBed); // CatalogBed güncelle
router.delete("/deleteCatalogBed/:id", deleteCatalogBed); // CatalogBed sil

module.exports = router;
