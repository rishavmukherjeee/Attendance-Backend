import { Router } from "express";
import { isFaculty, isStudent, protect } from "../../middlewares/auth.middleware";
import { getStudent, getStudentsForAttendance, studentLogin, studentRegistration } from "../../controllers/accounts/student.controller";

const router = Router()

router.get("/me", [protect, isStudent], getStudent)
router.get("/list", [protect, isFaculty], getStudentsForAttendance) // require query params section,semester, department(shortName)
router.post("/register", studentRegistration)
router.post("/login", studentLogin)

export default router
