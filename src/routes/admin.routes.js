const express = require('express');
const router = express.Router();
const {createSubject,getAllSubjects} = require('../controllers/admin/createSubject');
const {showAll} = require('../controllers/student/show');
const { upload } = require('../middlewares/multer.middleware');
const { importStudents } = require('../controllers/admin/createUser');
const { onLogin, onRegister, getUser, onLogout, generateReport, createSubjectAdmin, deleteSubject } = require('../controllers/admin/admin.controller');
const { validateUser } = require('../middlewares/auth.milddleware');

router.post('/', (req, res) => {    
  console.log('Reached admin route'); 
  res.status(200).send('Admin Route');
});

router.post('/createSubject', createSubject);
router.get('/getAllSubjects', getAllSubjects);
/*
router.post('/:id', (req, res) => {
  const id = req.params.id;
  console.log('Reached teacher route with ID:', id);
  res.status(200).send(id);
});
  */
router.post('/showAll',showAll)
router.post('/importStudents', upload.single('file'), importStudents)
router.post('/register', onRegister);
router.post('/login', onLogin);
router.get('/me', validateUser, getUser);
router.get('/logout', onLogout);
router.get('/report-generation', generateReport);
router.post('/subject/create', createSubjectAdmin);
router.delete('/subject/delete/:department/:semester/:section/:id', deleteSubject);

module.exports = router;
