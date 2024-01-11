import { Router } from 'express';
import { createSection, deleteSectionById, editSectionById, getAllSection, getSectionById } from '../controllers/section.controller';
const router = Router();

router.route("/")
      .get(getAllSection)
      .post(createSection);

router.route("/:id")
      .get(getSectionById)
      .put(editSectionById)
      .delete(deleteSectionById);

export default router;