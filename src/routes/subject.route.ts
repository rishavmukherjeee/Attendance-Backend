import { Router } from 'express';
import { createSubject, deleteSubjectById, editSubjectById, getAllSubject, getSubjectById } from '../controllers/subject.controller';
const router = Router();

router.route("/")
      .get(getAllSubject)
      .post(createSubject);

router.route("/:id")
      .get(getSubjectById)
      //.put(editSubjectById)
      .delete(deleteSubjectById);

export default router;