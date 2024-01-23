import { NextFunction } from "express";
import { Schema, Document, model } from "mongoose";
import { ISession, sessionSchema } from "./session.model";

export interface IDepartment extends Document {
    name: string;
    description: string;
    shortName: string;
    session: ISession;
    subjects: Schema.Types.ObjectId[];
    faculties: Schema.Types.ObjectId[];
}

export const departmentSchema = new Schema<IDepartment>({
    name: {
        type: String,
        minlength: 4,
        required: true,
        unique: true
    },
    shortName: {
        type: String,
        required: true,
        unique: true
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
