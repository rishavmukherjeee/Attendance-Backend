const express = require("express");
const {
  getAllDepartment,
  createDepartment,
  getDepartmentById,
  deleteDepartmentById,
  updateDepartmentById,
} = require("../controllers/department.controller");
const router = express.Router();

/**
 * @swagger
 * /v1/department:
 *   get:
 *     summary: Get a list of departments
 *     description: Returns a list of departments
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Department'
 *       404:
 *         description: Departments not found
 */
router.route("/").get(getAllDepartment).post(createDepartment);

/**
 * @swagger
 * /v1/department/{id}:
 *   get:
 *     summary: Get a department
 *     description: Returns a department of the dept id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the department
 *         required: true
 *         schema:
 *           type: string
 *
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/components/schemas/Department'
 *       404:
 *         description: Department not found
 */
router
  .route("/:id")
  .get(getDepartmentById)
  .delete(deleteDepartmentById)
  .put(updateDepartmentById);

module.exports = router;
