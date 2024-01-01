const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    Department:
 *      type: object
 *      required:
 *        - id
 *        - name
 *        - lastname
 *      properties:
 *        id:
 *            type: string
 *            description: Required
 *        name:
 *            type: string
 *            description: Required
 *        semester:
 *            type: string
 *            description: Total semesters
 *        section:
 *            type: Array
 *            description: Array of section
 *        
 */
const departmentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  semester: {
    type: Number,
    default: 8,
  },
  section: {
    type: [Number],
    default: [1, 1, 1, 1, 1, 1, 1, 1],
  },
});

// Create the GlobalData model
const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
