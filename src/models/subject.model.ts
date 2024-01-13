import { Schema, Document, model } from "mongoose";
export interface ISubject extends Document {
    name: string;
    code: string;
    description: string;
    type: string;
    credit_points: number;
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
        unique: true,
        required: true
    },
    "type": {
        type: String,
        enum: ["THEORY", "LAB"],
        default: "THEORY"
    },
    credit_points: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
},
    {
        timestamps: true
    }
)

const Subject = model("Subject", subjectSchema)

export default Subject
