const express = require('express');
const { getAllDepartment, createDepartment, getDepartmentById, deleteDepartmentById, updateDepartmentById } = require('../controllers/department.controller');
const router = express.Router();

router.route('/')
      .get(getAllDepartment)
      .post(createDepartment);

router.route('/:id')
      .get(getDepartmentById)
      .delete(deleteDepartmentById)
      .put(updateDepartmentById);

module.exports = router;