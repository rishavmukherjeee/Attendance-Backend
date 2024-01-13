import { Router } from "express";
import { createSession, getAllSession, getSessionById } from "../controllers/session.controller"
const router = Router()

router.post("/createOne", createSession)
router.get("/", getAllSession)
router.get("/:id", getSessionById)

export default router