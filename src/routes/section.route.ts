import { Router } from 'express';
import { createSection, deleteSectionById, editSectionById, getSectionById, getSectionByQuery } from '../controllers/section.controller';
const router = Router();

router.route("/")
      .get(getSectionByQuery)
      .post(createSection);

router.route("/:id")
      .get(getSectionById)
      .put(editSectionById)
      .delete(deleteSectionById);

export default router;