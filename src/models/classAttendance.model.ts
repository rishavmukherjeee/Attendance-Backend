import { Document, Schema, model } from 'mongoose';

export interface IClassAttendance extends Document {
    classId: Schema.Types.ObjectId;
    Date: Date;
    attendance: Schema.Types.ObjectId[];
}

const classAttendanceSchema = new Schema<IClassAttendance>({
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
        required: [true, "Class id is required"],
    },
    Date: {
        type: Date,
        required: true
    },
    attendance: [
        {
            type: Schema.Types.ObjectId,
            ref: "Attendance"
        }
    ]
}, {
    timestamps: true,
});

classAttendanceSchema.index({ date: 1 });

const classAttendanceModel = model("ClassAttendance", classAttendanceSchema);

export default classAttendanceModel;