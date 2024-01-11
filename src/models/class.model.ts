import { Document, Schema, model } from 'mongoose';

export interface IClass extends Document {
    classId: string;
    date: Date;
    department: Schema.Types.ObjectId;
    section: Schema.Types.ObjectId;
    semester: Schema.Types.ObjectId;
    subject: Schema.Types.ObjectId;
    attendances: Schema.Types.ObjectId[];
}

const classSchema = new Schema<IClass>({
    classId: {
        type: String,
        required: [true, "Class id is required"],
    },
    date: {
        type: Date,
        required: [true, "Date is required"],
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: "Section",
        required: true,
    },
    semester: {
        type: Schema.Types.ObjectId,
        ref: "Semester",
        required: true,
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    attendances: [
        {
            type: Schema.Types.ObjectId,
            ref: "Attendance",
        },
    ],
}, {
    timestamps: true,
});

classSchema.index({ date: 1 });

const classModel = model("Class", classSchema);

export default classModel;