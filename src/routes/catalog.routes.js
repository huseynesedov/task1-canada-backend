const express = require("express");
const router = express.Router();


const { createCatalogBed, getCatalogBeds, getCatalogBed, updateCatalogBed, deleteCatalogBed } = require("../controllers/catalog.bed.controller");

const { createCatalogPrice, getCatalogPrices, getCatalogPrice, updateCatalogPrice, deleteCatalogPrice } = require("../controllers/catalog.price.controller");

const { createCatalogBaths, getCatalogBathss, getCatalogBaths, updateCatalogBaths, deleteCatalogBaths } = require("../controllers/catalog.baths.controller");


// CatalogBaths işlemleri
router.post("/CatalogBaths", createCatalogBaths);  // Yeni CatalogBaths oluştur
router.get("/CatalogBathss", getCatalogBathss);    // Tüm CatalogBaths'ları getir
router.get("/CatalogBaths/:id", getCatalogBaths); // Belirli bir CatalogBaths getir
router.put("/CatalogBaths/:id", updateCatalogBaths); // CatalogBaths güncelle
router.delete("/CatalogBaths/:id", deleteCatalogBaths); // CatalogBaths sil

// CatalogPrice işlemleri
router.post("/catalogPrice", createCatalogPrice);  // Yeni CatalogPrice oluştur
router.get("/catalogPrices", getCatalogPrices);    // Tüm CatalogPrice'ları getir
router.get("/catalogPrice/:id", getCatalogPrice); // Belirli bir CatalogPrice getir
router.put("/catalogPrice/:id", updateCatalogPrice); // CatalogPrice güncelle
router.delete("/catalogPrice/:id", deleteCatalogPrice); // CatalogPrice sil

// CatalogBed işlemleri
router.post("/catalogBed", createCatalogBed);  // Yeni CatalogBed oluştur
router.get("/catalogBeds", getCatalogBeds);    // Tüm CatalogBed'leri getir
router.get("/catalogBed/:id", getCatalogBed); // Belirli bir CatalogBed getir
router.put("/catalogBed/:id", updateCatalogBed); // CatalogBed güncelle
router.delete("/catalogBed/:id", deleteCatalogBed); // CatalogBed sil

module.exports = router;
