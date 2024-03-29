import { Router } from 'express';
import { createSubject, deleteSubjectById, editSubjectById, getAllSubject, getSubjectById,deleteSubjectArrayFromTeacher, assignandappendSubjectArrayToTeacher

} from '../controllers/subject.controller';
const router = Router();

router.get("/", getAllSubject)
router.post("/addNew", createSubject);

router.put("/delete", deleteSubjectArrayFromTeacher);
router.route("/:id")
      .get(getSubjectById)
      .put(editSubjectById)
      .delete(deleteSubjectById);

router.post("/assign", assignandappendSubjectArrayToTeacher);

export default router;