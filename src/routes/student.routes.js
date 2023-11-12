const express = require('express');
const router = express.Router();
const {showAll} = require('../controllers/student/show');
const { showAllIds } = require('../controllers/teacher/allSubject');
//const teacherController = require('../controllers/teacher.controller');
const {data}= require('../controllers/student/data');
const { validateUser, authorizedRoles } = require('../middlewares/auth.milddleware');
const { getAllStudentOfSemsterAndSection, registerStudent } = require('../controllers/student/student.controller.js');
router.post('/', (req, res) => {
    
  console.log('Reached Student route'); 
  res.send('Student Route');
});
/*/
router.post('/:id', (req, res) => {
    const id = req.params.id;
    console.log('Reached student route with Roll:', id);
    res.send('Student Route',id);
  });
  */
router.post('/data',data )
router.post('/allSubjects', showAllIds)
router.post('/showAll', showAll)
router.get('/all/:department/:semester/:section', validateUser, authorizedRoles("ADMIN", "SUPER-ADMIN"), getAllStudentOfSemsterAndSection)
router.post('/register/:department/:semester/:section', validateUser, authorizedRoles("ADMIN", "SUPER-ADMIN"), registerStudent)

module.exports = router;