import { Router } from "express"
import { createClass, getClassById, getClasses } from "../controllers/class.controller"
import { isAdmin, protect } from "../middlewares/auth.middleware"

const router = Router()

router.get('/', [protect], getClasses)
router.get('/:id', [protect], getClassById)
router.post('/create', [protect], createClass)

export default router