import { Router } from 'express';
import { createSubject, deleteSubjectById, editSubjectById, getAllSubject, getSubjectById, assignSubjectArrayToTeacher, deleteSubjectArrayFromTeacher

} from '../controllers/subject.controller';
const router = Router();

router.get("/", getAllSubject)
router.post("/addNew", createSubject);

router.route("/:id")
      .get(getSubjectById)
      .put(editSubjectById)
      .delete(deleteSubjectById);

router.post("/assign", assignSubjectArrayToTeacher);
router.put("/delete", deleteSubjectArrayFromTeacher);

export default router;