import { NextFunction } from "express";
import { Schema, Document, model } from "mongoose";

export interface IDepartment extends Document {
    name: string;
    description: string;
    shortName: string;
    subjects: Schema.Types.ObjectId[];
    semesters: Schema.Types.ObjectId[];
    faculties: Schema.Types.ObjectId[];
}

const departmentSchema = new Schema<IDepartment>({
    name: {
        type: String,
        minlength: 4,
        required: true,
    },
    shortName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subject"
        }
    ],
    semesters: [
        {
            type: Schema.Types.ObjectId,
            ref: "Semester"
        }
    ],
    faculties: [
        {
            type: Schema.Types.ObjectId,
            ref: "Teacher"
        }
    ],
},
    {
        timestamps: true
    }
)

const Department = model("Department", departmentSchema)

export default Department
