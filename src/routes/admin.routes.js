const express = require("express");
const {} = require("swagger-jsdoc");
const router = express.Router();
const {
  createSubject,
  getAllSubjects,
} = require("../controllers/admin/createSubject");
const { showAll } = require("../controllers/student/show");
const { upload } = require("../middlewares/multer.middleware");
const { importStudents } = require("../controllers/admin/createUser");
const {
  onLogin,
  onRegister,
  getUser,
  onLogout,
  generateReport,
  createSubjectAdmin,
  deleteSubject,
  getStudentsBySubject,
  deleteRollInSubject,
  getStudentsToBeAddedInSubject,
  addStudentsInSubjets,
} = require("../controllers/admin/admin.controller");
const { validateUser } = require("../middlewares/auth.milddleware");

router.post("/", (req, res) => {
  console.log("Reached admin route");
  res.status(200).send("Admin Route");
});

router.post("/createSubject", createSubject);

router.get("/getAllSubjects", getAllSubjects);

router.post("/showAll", showAll);
router.post("/importStudents", upload.single("file"), importStudents);
router.post("/register", onRegister);
router.post("/login", onLogin);

/**
 * @swagger
 * /v1/admin/me:
 *   get:
 *     summary: Get the user
 *     description: Returns a user object
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/components/schemas/Student'
 */
router.get("/me", validateUser, getUser);
router.get("/logout", onLogout);
router.get("/report-generation", generateReport);

router.post("/subject/create", createSubjectAdmin);
router.delete(
  "/subject/delete/:department/:semester/:section/:id",
  deleteSubject
);
/**
 * add roll number inside the subjects roll field
 */
router.put(
  "/subject/create/student/:department/:semester/:section/:papercode",
  addStudentsInSubjets
);
router.get(
  "/subject/get/student/:department/:semester/:section/:papercode",
  getStudentsBySubject
);
router.get(
  "/subject/get/pending/student/:department/:semester/:section/:papercode",
  getStudentsToBeAddedInSubject
);
router.put(
  "/subject/delete/student/:department/:semester/:section/:papercode",
  deleteRollInSubject
);

module.exports = router;
