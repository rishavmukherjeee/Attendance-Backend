import { Router } from "express"
import { isAdmin, isFaculty, protect } from "../middlewares/auth.middleware"
import { createAttendance, generateReport, getAttendanceList } from "../controllers/attendance.controller"

const router = Router()

router.get("/getReport", [protect, isFaculty], generateReport)
router.post("/create", [protect, isFaculty], createAttendance)
router.get("/:id", [protect, isFaculty], getAttendanceList)

export default router