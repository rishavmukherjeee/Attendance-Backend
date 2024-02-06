import { Router } from "express";
import { createSession, getAllSession, getSessionByDepartment, getSessionById } from "../controllers/session.controller"
const router = Router()

router.post("/createOne", createSession)
router.get("/", getAllSession)
router.get("/:id", getSessionById)
router.get("/dept/:dept", getSessionByDepartment)

export default router