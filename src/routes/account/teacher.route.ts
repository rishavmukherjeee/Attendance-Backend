import { Router } from "express";
import { getTeacher, assignedClassToTeacher, teacherLogin, teacherRegistration, unAssignedClassToTeacher } from "../../controllers/accounts/teacher.controller";
import { isAdmin, isFaculty, isStudent, protect } from "../../middlewares/auth.middleware";

const router = Router()

/**
 * @swagger
 * /auth/teacher/me:
 *   get:
 *     summary: Get info about me
 *     description: Retrieve the data of current user.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Teacher Auth
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 * /auth/teacher/login:
 *   post:
 *     tags:
 *       - Teacher Auth
 *     summary: User login
 *     description: Authenticate a user with provided credentials.
 *     requestBody:
 *       description: Login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *       '500':
 *         description: Internal server error
 */

router.get("/me", [protect], getTeacher)
router.post("/register", teacherRegistration)
router.post("/login", teacherLogin)
router.post("/updateClass", [protect, isAdmin], assignedClassToTeacher)
router.post("/removeClass", [protect, isAdmin], unAssignedClassToTeacher)


export default router