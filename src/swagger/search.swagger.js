/**
 * @swagger
 * /api/Search/SearchByProducts:
 *   post:
 *     summary: Search products with filters and pagination
 *     tags:
 *       - Search
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *                 description: Page number (default is 0)
 *                 example: 0
 *               pageSize:
 *                 type: integer
 *                 description: Number of products per page (default is 10)
 *                 example: 10
 *               filters:
 *                 type: array
 *                 description: Array of filter objects
 *                 items:
 *                   type: object
 *                   properties:
 *                     fieldName:
 *                       type: string
 *                       description: The field to filter by (e.g. catalogBedId, catalogPriceId)
 *                       example: "catalogBedId"
 *                     value:
 *                       type: string
 *                       description: The value to filter the field by
 *                       example: "12345"
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 totalProducts:
 *                   type: integer
 *                   description: Total number of products found
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *                   example: 0
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
