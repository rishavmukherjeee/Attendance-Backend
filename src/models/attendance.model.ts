import { Schema, Document, model } from "mongoose";
import Class from "./class.model";

export interface IAttendance extends Document {
    student: Schema.Types.ObjectId;
    classInfo: Schema.Types.ObjectId;
    isPresent: boolean;
}

const attendanceSchema = new Schema<IAttendance>(
    {
        classInfo: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        isPresent: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
);

// Add an index on the 'date' field for future documents
attendanceSchema.index({ 'classInfo.subject': 1, 'classInfo.semester': 1, 'classInfo.department.shortName': 1, 'classInfo.section': 1 });

const Attendance = model('Attendance', attendanceSchema);

export default Attendance