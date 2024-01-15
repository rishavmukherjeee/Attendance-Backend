import { Router } from "express";
import { getStudent, getTeacher, studentLogin, studentRegistration, teacherLogin, teacherRegistration } from "../controllers/account.controller";
import { isFaculty, isStudent, protect } from "../middlewares/auth.middleware";

const router = Router()

router.get("/student/me", [protect, isStudent], getStudent)
router.post("/student/register", studentRegistration)
router.get("/teacher/me", [protect], getTeacher)
router.post("/teacher/register", teacherRegistration)
router.post("/student/login", studentLogin)
router.post("/teacher/login", teacherLogin)


export default router