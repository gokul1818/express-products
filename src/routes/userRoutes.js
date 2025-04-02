const express = require("express");
const { createUser, getUsers, updateUser } = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * /api/user/create-user:
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the database.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               phoneNumber:
 *                 type: number
 *                 example: 1234567890
 *               address:
 *                 type: object
 *                 properties:
 *                   doorNumber:
 *                     type: string
 *                     example: "12A"
 *                   street:
 *                     type: string
 *                     example: "Baker Street"
 *                   city:
 *                     type: string
 *                     example: "London"
 *                   state:
 *                     type: string
 *                     example: "Greater London"
 *                   zipCode:
 *                     type: string
 *                     example: "NW1 6XE"
 *                   country:
 *                     type: string
 *                     example: "UK"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request, missing required fields
 */
router.post("/create-user", createUser);

/**
 * @swagger
 * /api/user/get-all-user:
 *   get:
 *     summary: Get all users
 *     description: Fetches all users from the database.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *       500:
 *         description: Server error
 */
router.get("/get-all-user", getUsers);

/**
 * @swagger
 * /api/user/update-user:
 *   put:
 *     summary: Update user information
 *     description: Updates user details including name, phone number, and address.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe Updated
 *               phoneNumber:
 *                 type: number
 *                 example: 9876543210
 *               address:
 *                 type: object
 *                 properties:
 *                   doorNumber:
 *                     type: string
 *                     example: "15B"
 *                   street:
 *                     type: string
 *                     example: "Wall Street"
 *                   city:
 *                     type: string
 *                     example: "New York"
 *                   state:
 *                     type: string
 *                     example: "NY"
 *                   zipCode:
 *                     type: string
 *                     example: "10005"
 *                   country:
 *                     type: string
 *                     example: "USA"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: User not found
 */
router.put("/update-user", updateUser);

module.exports = router;
