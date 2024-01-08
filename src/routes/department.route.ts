import { Router } from "express";
import { createDepartment, getDepartments, getDepartmentsById } from "../controllers/department.controller"
const router = Router()

router.route("/").get(getDepartments).post(createDepartment)
router.get("/:id", getDepartmentsById)

export default router