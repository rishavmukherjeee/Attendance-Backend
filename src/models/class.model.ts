import { Document, Schema, model } from 'mongoose';

export interface IClass extends Document {
    className: string;
    department: Schema.Types.ObjectId;
    section: Schema.Types.ObjectId;
    semester: Schema.Types.ObjectId;
    subject: Schema.Types.ObjectId;
    time: Date;
    day: string[];
}

const classSchema = new Schema<IClass>({
    className: {
        type: String,
        required: [true, "Class id is required"],
    },
    time: {
        type: Date,
        required: true
    },
    day: [
        {
            type: String,
            required: true
        }
    ],
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: "Section",
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
    }
}, {
    timestamps: true,
});

classSchema.index({ className: 1 });

const Class = model("Class", classSchema);

export default Class;