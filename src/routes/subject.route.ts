import { Router } from 'express';
import {
      createSubject, deleteSubjectById, editSubjectById, getAllSubject, getSubjectById, deleteSubjectArrayFromTeacher, assignandappendSubjectArrayToTeacher, getTeacherSubjects

} from '../controllers/subject.controller';
import { protect } from '../middlewares/auth.middleware';
const router = Router();

router.use(protect)

router.get("/", getAllSubject)
router.get("/getTeacherSubjects", getTeacherSubjects)
router.post("/addNew", createSubject);

router.put("/delete", deleteSubjectArrayFromTeacher);
router.route("/:id")
      .get(getSubjectById)
      .put(editSubjectById)
      .delete(deleteSubjectById);

router.post("/assign", assignandappendSubjectArrayToTeacher);

export default router;