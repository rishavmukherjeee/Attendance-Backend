import { Router } from "express";
import { createSession } from "../controllers/session.controller"
const router = Router()

router.route("/").post(createSession)

export default router