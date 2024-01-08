import { NextFunction } from "express";
import { Schema, Document, model } from "mongoose";
import Department from "./department.model";

export interface ISemester extends Document {
    name: number;
    department: Schema.Types.ObjectId;
    session: Schema.Types.ObjectId;
    section: Schema.Types.ObjectId[];
    subjects: Schema.Types.ObjectId[];
    strength: number;
}

const semesterSchema = new Schema<ISemester>({
    name: {
        type: Number,
        required: [true, "Semester name is rquired"],
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subject"
        }
    ],
    section: [
        {
            type: Schema.Types.ObjectId,
            ref: "Section",
        }
    ],
    strength: {
        type: Number,
        default: 0
    },
    session: {
        type: Schema.Types.ObjectId,
        ref: "Session",
        required: true
    }
},
    {
        timestamps: true
    }
);

semesterSchema.pre('deleteOne', { document: true }, async function (this: any, next: NextFunction) {
    try {
        // Remove the assignment reference from the associated Person
        await Department.findByIdAndDelete(
            { _id: this._id },
            { $pull: { semesters: this._id } }
        );
        next();
    } catch (error) {
        next(error);
    }
});

const Semester = model('Semester', semesterSchema);

export default Semester