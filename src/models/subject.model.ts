import { NextFunction } from "express";
import { Schema, Document, model } from "mongoose";
import AppError from "../utils/app-error";

export interface ISubject extends Document {
    name: string;
    code: string;
    description: string;
    semester: number;
}

const subjectSchema = new Schema<ISubject>({
    name: {
        type: String,
        minlength: 4,
        required: true,
    },
    code: {
        type: String,
        minlength: 4,
    },
    description: {
        type: String
    },
    semester: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    }

},
    {
        timestamps: true
    }
)

const Subject = model("Subject", subjectSchema)

export default Subject
