import { Router } from "express"
import { isAdmin, isFaculty, protect } from "../middlewares/auth.middleware"
import { createAttendance, generateReport, getAttendanceList, getStudentsForAttendance } from "../controllers/attendance.controller"

const router = Router()

router.use([protect, isFaculty])
router.get("/getReport", generateReport)
router.get('studentList', getStudentsForAttendance) // require query params section,semester, department(shortName)
router.post("/create", createAttendance)
router.get("/:id", getAttendanceList)

export default router