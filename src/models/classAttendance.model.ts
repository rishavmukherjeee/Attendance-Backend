import { Document, Schema, model } from 'mongoose';

export interface IClassAttendance extends Document {
    classInfo: Schema.Types.ObjectId;
    Date: Date;
    // subject: string;
    attendance: Schema.Types.ObjectId[];
}

const classAttendanceSchema = new Schema<IClassAttendance>({
    classInfo: {
        type: Schema.Types.ObjectId,
        ref: "Class"
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

const ClassAttendance = model("ClassAttendance", classAttendanceSchema);

export default ClassAttendance;