/**
 * @swagger
 * 
 * /api/catalog/createCatalogBath:
 *   post:
 *     summary: Create a new catalog price
 *     tags:
 *       - Catalog Bath
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CatalogBathDto'
 *     responses:
 *       201:
 *         description: Catalog price created successfully
 *       400:
 *         description: Bad request (missing fields or validation errors)
 * 
 * /api/catalog/getAllCatalogBaths:
 *   get:
 *     summary: Get all catalog prices
 *     tags:
 *       - Catalog Bath
 *     responses:
 *       200:
 *         description: Successfully retrieved catalog prices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CatalogBathDto'
 *       500:
 *         description: Server error
 *
 * /api/catalog/getCatalogBathById/{id}:
 *   get:
 *     summary: Get catalog price by ID
 *     tags:
 *       - Catalog Bath
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
 * /api/catalog/uptadeCatalogBath/{id}:
 *   put:
 *     summary: Update a catalog price
 *     tags:
 *       - Catalog Bath
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
 *             $ref: '#/components/schemas/CatalogBathDto'
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
 * /api/catalog/deleteCatalogBath/{id}:
 *   delete:
 *     summary: Delete a catalog price
 *     tags:
 *       - Catalog Bath
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
 *     CatalogBathDto:
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