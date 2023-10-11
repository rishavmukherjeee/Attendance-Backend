const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: [String],
    subjects: {
      phy: {
        type: Object,
        default: {}
      },
      chem: {
        type: Object,
        default: {}
      }
    }
    
  },
  {
    timestamps: false,
  }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
