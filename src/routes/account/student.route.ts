import { Router } from "express";
import { isFaculty, isStudent, protect } from "../../middlewares/auth.middleware";
import { getStudent, studentLogin, studentRegistration } from "../../controllers/accounts/student.controller";

const router = Router()

router.get("/me", [protect, isStudent], getStudent)
router.post("/register", studentRegistration)
router.post("/login", studentLogin)

export default router
