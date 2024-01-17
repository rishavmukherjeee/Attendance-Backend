import { Router } from "express";
import { getTeacher, assignedClassToTeacher, teacherLogin, teacherRegistration, unAssignedClassToTeacher } from "../../controllers/accounts/teacher.controller";
import { isFaculty, isStudent, protect } from "../../middlewares/auth.middleware";

const router = Router()

router.get("/me", [protect], getTeacher)
router.post("/register", teacherRegistration)
router.post("/login", teacherLogin)
router.post("/updateClass", [protect], assignedClassToTeacher)
router.post("/removeClass", [protect], unAssignedClassToTeacher)


export default router