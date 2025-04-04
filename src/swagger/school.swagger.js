// School swagger doc - start //

/**
 * @swagger
 * /api/school/getAllSchools:
 *   get:
 *     summary: Get all schools
 *     tags:
 *       - Schools
 *     responses:
 *       200:
 *         description: Successfully retrieved schools
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SchoolDto'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/school/createSchool:
 *   post:
 *     tags:
 *       - Schools
 *     summary: Create a new school with images
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - mainSchoolImg
 *               - schoolRoomImgs
 *               - location
 *               - latitude
 *               - longitude
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               mainSchoolImg:
 *                 type: string
 *                 format: binary
 *               schoolRoomImgs:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               location:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       201:
 *         description: School created successfully
 *       400:
 *         description: Bad Request - Missing or invalid fields
 *       500:
 *         description: Server Error - Something went wrong
 */

/**
 * @swagger
 * /api/school/getSchoolById/{id}:
 *   get:
 *     summary: Get a school by ID
 *     tags:
 *       - Schools
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: School found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolDto'
 *       404:
 *         description: School not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/school/updateSchool/{id}:
 *   put:
 *     summary: Update a school
 *     tags:
 *       - Schools
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
 *             $ref: '#/components/schemas/SchoolDto'
 *     responses:
 *       200:
 *         description: School updated successfully
 *       404:
 *         description: School not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/school/deleteSchool/{id}:
 *   delete:
 *     summary: Delete a school
 *     tags:
 *       - Schools
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: School deleted successfully
 *       404:
 *         description: School not found
 *       500:
 *         description: Server error
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     SchoolDto:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *           example: "Sunrise High School"
 *         description:
 *           type: string
 *           example: "A well-known school with modern facilities."
 *         mainSchoolImg:
 *           type: string
 *           example: "https://example.com/image.jpg"
 *         schoolRoomImgs:
 *           type: array
 *           items:
 *             type: string
 *         location:
 *           type: string
 *           example: "Los Angeles, CA"
 *         latitude:
 *           type: number
 *           example: 34.0522
 *         longitude:
 *           type: number
 *           example: -118.2437
 */
