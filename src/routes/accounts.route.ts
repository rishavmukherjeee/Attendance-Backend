import { Router } from "express";
import { studentLogin, studentRegistration, teacherLogin, teacherRegistration } from "../controllers/account.controller";

const router = Router()

router.get('/', (req, res) => {
    res.send("authentication route")
})
router.post("/student/register", studentRegistration)
router.post("/teacher/register", teacherRegistration)
router.post("/student/login", studentLogin)
router.post("/teacher/login", teacherLogin)


export default router