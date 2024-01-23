import { NextFunction } from "express";
import { Schema, Document, model } from "mongoose";
import Department from "./department.model";

export interface ISemester extends Document {
    sem: number;
    session: Schema.Types.ObjectId;
    section: Schema.Types.ObjectId[];
    subjects: Schema.Types.ObjectId[];
}

export const semesterSchema = new Schema<ISemester>({
    sem: {
        type: Number,
        required: [true, "Semester is rquired"],
    },
    session: {
        type: Schema.Types.ObjectId,
        ref: "Session",
        required: true
    },
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subject"
        }
    ]
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