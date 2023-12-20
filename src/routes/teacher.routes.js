/*const express = require("express");
const router = express.Router();
const studentsControllers = require("../controllers/student.controller");

//router.post("/create", communityController.createPost);
router.get("/students", studentsControllers.getAll);
//router.delete("/delete", communityController.delete);
router.post("/", async (req, res) => {
    res.send("okk");
  });
module.exports = router;
*/
const express = require('express');
const router = express.Router();
//const teacherController = require('../controllers/teacher.controller');
const attendanceController = require('../controllers/teacher/attendance');
const { showAll } = require('../controllers/teacher/show');
const { showAllIds } = require('../controllers/teacher/allSubject');
const {data}  = require('../controllers/teacher/data');
const { validateUser, authorizedRoles } = require('../middlewares/auth.milddleware');
const { getAllTeachers, onRegister } = require('../controllers/teacher/teacher.controller.js');
router.post('/', (req, res) => {
  console.log('Reached teacher route'); 
  res.status(200).send('Teacher Route');
});
/*
router.post('/:id', (req, res) => {
  const id = req.params.id;
  console.log('Reached teacher route with ID:', id);
  res.status(200).send(id);
});
*/
router.post('/allSubjects',showAllIds)
router.post('/data',data)
router.post('/newAttendance', attendanceController.updateAttendance);
router.post('/showAll',showAll)
router.get('/all', validateUser, authorizedRoles("SUPER-ADMIN", "ADMIN"), getAllTeachers)
router.get('/allteachers', getAllTeachers)
router.post('/register', onRegister)
// router.get('/login', onLogin)
// router.get('/me', validateUser, getUser)

module.exports = router;
