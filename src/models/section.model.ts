import { NextFunction } from 'express'
import { Schema, Document, model } from "mongoose";

export interface ISection extends Document {
    name: string;
    students: Schema.Types.ObjectId[];
    session: Schema.Types.ObjectId;
    strength: number;
}

export const sectionSchema = new Schema<ISection>({
    name: {
        type: String,
        required: [true, "section name is rquired"],
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
        }
    ],
    session: {
        type: Schema.Types.ObjectId,
        ref: "Session",
        required:true
    },
    strength: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    }
);

sectionSchema.pre<ISection>("save", async function (next: NextFunction) {
    if (this.isModified("students")) {
        this.strength = this.students.length;
    }
    next();
})

const Section = model('Section', sectionSchema);

export default Section