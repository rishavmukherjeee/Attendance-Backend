import { Router } from "express"
import { isAdmin, isFaculty, protect } from "../middlewares/auth.middleware"
import { createAttendance } from "../controllers/attendance.controller"

const router = Router()

router.post("/create", [protect, isFaculty], createAttendance)

export default router