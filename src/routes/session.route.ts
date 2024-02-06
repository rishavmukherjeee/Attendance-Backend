import { Router } from "express";
import { createSession, getAllSession, getSessionByDepartment, getSessionById } from "../controllers/session.controller"
import { isAdmin, protect } from "../middlewares/auth.middleware";

const router = Router()

router.use([protect, isAdmin])
router.post("/createOne", createSession)
router.get("/", getAllSession)
router.get("/:id", getSessionById)
router.get("/dept/:dept", getSessionByDepartment)

export default router