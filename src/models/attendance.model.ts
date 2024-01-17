import { Schema, Document, model } from "mongoose";

export interface IAttendance extends Document {
    student: Schema.Types.ObjectId;
    subject: Schema.Types.ObjectId;
    date: Date;
    isPresent: boolean;
}

const attendanceSchema = new Schema<IAttendance>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        date: { type: Date, required: true },
        isPresent: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
);

// Add an index on the 'date' field for future documents
attendanceSchema.index({ date: 1 });

const Attendance = model('Attendance', attendanceSchema);

export default Attendance