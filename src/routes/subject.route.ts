import { Router } from 'express';
import { createSubject, deleteSubjectById, editSubjectById, getAllSubject, getSubjectById } from '../controllers/subject.controller';
const router = Router();

router.get("/", getAllSubject)
router.post("/addNew", createSubject);

router.route("/:id")
      .get(getSubjectById)
      .put(editSubjectById)
      .delete(deleteSubjectById);

export default router;