import { Router } from "express"
import { createClass, getClassById, getClasses } from "../controllers/class.controller"
import { isAdmin, protect } from "../middlewares/auth.middleware"

const router = Router()

router.get('/', [protect], getClasses)
router.get('/:id', [protect, isAdmin], getClassById)
router.post('/create', [protect, isAdmin], createClass)

export default router