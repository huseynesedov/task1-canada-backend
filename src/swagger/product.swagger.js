// Product swagger doc - start //

/**
 * @swagger
 * /api/Product/getAllProducts:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductDto'
 *       500:
 *         description: Server error
 *
 * @swagger
 * /api/Product/createProduct:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product with images
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - mainRoomImg
 *               - roomImgs
 *             properties:
 *               title:
 *                 type: string
 *               mainRoomImg:
 *                 type: string
 *                 format: binary
 *                 description: Main room image (single image upload)
 *               roomImgs:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of room images (multiple images upload)
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               roomNumber:
 *                 type: string
 *               CatalogBaths:
 *                 type: string
 *               catalogPrice:
 *                 type: string
 *               catalogBed:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 mainRoomImg:
 *                   type: string
 *                   description: URL of the main room image
 *                 roomImgs:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: URLs of the room images
 *                 description:
 *                   type: string
 *                 location:
 *                   type: string
 *                 roomNumber:
 *                   type: string
 *                 CatalogBaths:
 *                   type: string
 *                 catalogPrice:
 *                   type: string
 *                 catalogBed:
 *                   type: string
 *                 latitude:
 *                   type: number
 *                 longitude:
 *                   type: number
 *       400:
 *         description: Bad Request - Missing or invalid fields
 *       500:
 *         description: Server Error - Something went wrong
 *
 * /api/Product/updateProduct/{id}:
 *   put:
 *     summary: Update a product
 *     tags:
 *       - Products
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
 *             $ref: '#/components/schemas/ProductDto'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductDto'
 *       400:
 *         description: Bad request (missing fields or validation errors)
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 *
 * /api/Product/deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 *
 * components:
 *   schemas:
 *     ProductDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Luxury Apartment"
 *         description:
 *           type: string
 *           example: "A beautiful luxury apartment in the city center."
 *         location:
 *           type: string
 *           example: "New York, USA"
 *         roomNumber:
 *           type: string
 *           example: "3"
 *         CatalogBaths:
 *           type: string
 *           example: "660f0e5c7c4e4a001cfa1234"
 *         catalogPrice:
 *           type: string
 *           example: "660f0e5c7c4e4a001cfa5678"
 *         catalogBed:
 *           type: string
 *           example: "660f0e5c7c4e4a001cfa9101"
 *         latitude:
 *           type: number
 *           example: 40.7128
 *         longitude:
 *           type: number
 *           example: -74.0060
 *     ProductCreateRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Luxury Apartment"
 *         mainRoomImg:
 *           type: string
 *           format: binary
 *           description: Main room image (single image upload)
 *         roomImgs:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *           description: Array of room images (multiple images upload)
 *         description:
 *           type: string
 *           example: "A beautiful luxury apartment in the city center."
 *         location:
 *           type: string
 *           example: "New York, USA"
 *         roomNumber:
 *           type: string
 *           example: "3"
 *         CatalogBaths:
 *           type: string
 *           example: "660f0e5c7c4e4a001cfa1234"
 *         catalogPrice:
 *           type: string
 *           example: "660f0e5c7c4e4a001cfa5678"
 *         catalogBed:
 *           type: string
 *           example: "660f0e5c7c4e4a001cfa9101"
 *         latitude:
 *           type: number
 *           example: 40.7128
 *         longitude:
 *           type: number
 *           example: -74.0060
 */

// Product swagger doc - end //
