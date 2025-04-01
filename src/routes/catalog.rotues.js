const express = require("express");
const router = express.Router();

// Controller dosyalarına import işlemi
const CatalogTitleController = require("../contorllers/catalog.title.controller");
const CatalogPriceController = require("../contorllers/catalog.price.controller");
const CatalogBedController = require("../contorllers/catalog.bed.controller");

// CatalogTitle işlemleri
router.post("/catalogTitle", CatalogTitleController.createCatalogTitle);  // Yeni CatalogTitle oluştur
router.get("/catalogTitles", CatalogTitleController.getCatalogTitles);    // Tüm CatalogTitle'ları getir
router.get("/catalogTitle/:id", CatalogTitleController.getCatalogTitle); // Belirli bir CatalogTitle getir
router.put("/catalogTitle/:id", CatalogTitleController.updateCatalogTitle); // CatalogTitle güncelle
router.delete("/catalogTitle/:id", CatalogTitleController.deleteCatalogTitle); // CatalogTitle sil

// CatalogPrice işlemleri
router.post("/catalogPrice", CatalogPriceController.createCatalogPrice);  // Yeni CatalogPrice oluştur
router.get("/catalogPrices", CatalogPriceController.getCatalogPrices);    // Tüm CatalogPrice'ları getir
router.get("/catalogPrice/:id", CatalogPriceController.getCatalogPrice); // Belirli bir CatalogPrice getir
router.put("/catalogPrice/:id", CatalogPriceController.updateCatalogPrice); // CatalogPrice güncelle
router.delete("/catalogPrice/:id", CatalogPriceController.deleteCatalogPrice); // CatalogPrice sil

// CatalogBed işlemleri
router.post("/catalogBed", CatalogBedController.createCatalogBed);  // Yeni CatalogBed oluştur
router.get("/catalogBeds", CatalogBedController.getCatalogBeds);    // Tüm CatalogBed'leri getir
router.get("/catalogBed/:id", CatalogBedController.getCatalogBed); // Belirli bir CatalogBed getir
router.put("/catalogBed/:id", CatalogBedController.updateCatalogBed); // CatalogBed güncelle
router.delete("/catalogBed/:id", CatalogBedController.deleteCatalogBed); // CatalogBed sil

module.exports = router;
