import { Router } from "express";
import { getSemesterById, getAllSemester, createSemester, deleteById } from "../controllers/semester.controller"
const router = Router()

router.get("/all", getAllSemester)
router.post("/", createSemester)
router.post("/:id", getSemesterById)
router.delete("/:id", deleteById)

export default router