import { Router } from "express";
import { createDepartment, getDepartments, getDepartmentsById } from "../controllers/department.controller"
import { isAdmin, protect } from "../middlewares/auth.middleware";
const router = Router()

router.use([protect, isAdmin])
router.route("/").get(getDepartments).post(createDepartment)
router.get("/:id", getDepartmentsById)

export default router