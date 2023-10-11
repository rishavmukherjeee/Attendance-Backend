const express = require('express');
const router = express.Router();
//const teacherController = require('../controllers/teacher.controller');

router.post('/', (req, res) => {
    
  console.log('Reached Student route'); 
  res.send('Student Route');
});

router.post('/:id', (req, res) => {
    const id = req.params.id;
    console.log('Reached student route with Roll:', id);
    res.send('Student Route',id);
  });
  
module.exports = router;
