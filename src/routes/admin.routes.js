const express = require('express');
const router = express.Router();
const {createSubject,getAllSubjects} = require('../controllers/admin/createSubject');

router.post('/', (req, res) => {
    
  console.log('Reached admin route'); 
  res.status(200).send('Admin Route');
});

router.post('/createSubject', createSubject);
router.get('/getAllSubjects', getAllSubjects);

router.post('/:id', (req, res) => {
  const id = req.params.id;
  console.log('Reached teacher route with ID:', id);
  res.status(200).send(id);
});
  
module.exports = router;
