/**
 * @swagger
 * 
 * /api/catalog/createCatalogPrice:
 *   post:
 *     summary: Create a new catalog price
 *     tags:
 *       - Catalog Prices
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CatalogPrice'
 *     responses:
 *       201:
 *         description: Catalog price created successfully
 *       400:
 *         description: Bad request (missing fields or validation errors)
 * 
 * /api/catalog/getAllCatalogPrices:
 *   get:
 *     summary: Get all catalog prices
 *     tags:
 *       - Catalog Prices
 *     responses:
 *       200:
 *         description: Successfully retrieved catalog prices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CatalogPrice'
 *       500:
 *         description: Server error
 *
 * /api/catalog/getCatalogPriceById/{id}:
 *   get:
 *     summary: Get catalog price by ID
 *     tags:
 *       - Catalog Prices
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved catalog price
 *       404:
 *         description: Catalog price not found
 *       500:
 *         description: Server error
 *
 * /api/catalog/updateCatalogPrice/{id}:
 *   put:
 *     summary: Update a catalog price
 *     tags:
 *       - Catalog Prices
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CatalogPrice'
 *     responses:
 *       200:
 *         description: Catalog price updated successfully
 *       204:
 *         description: No content
 *       400:
 *         description: Bad request (missing fields or validation errors)
 *       404:
 *         description: Catalog price not found
 *
 * /api/catalog/deleteCatalogPrice/{id}:
 *   delete:
 *     summary: Delete a catalog price
 *     tags:
 *       - Catalog Prices
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catalog price deleted successfully
 *       204:
 *         description: No content
 *       404:
 *         description: Catalog price not found
 *       500:
 *         description: Server error
 *
 * components:
 *   schemas:
 *     CatalogPrice:
 *       type: object
 *       properties:
 *         countTitleAZ:
 *           type: string
 *           example: "Qiymət AZ"
 *         countTitleEN:
 *           type: string
 *           example: "Price EN"
 *         countTitleRU:
 *           type: string
 *           example: "Цена RU"
 */