import { Router } from "express";
import { getSemesterById, getAllSemester, createSemester, deleteById, updateSemester } from "../controllers/semester.controller"
const router = Router()

router.get("/all", getAllSemester)
router.post("/createOne", createSemester)
router.post("/:id", getSemesterById)
router.post("/upgrade/:id", updateSemester)
router.delete("/:id", deleteById)

export default router