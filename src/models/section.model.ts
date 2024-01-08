import { Schema, Document, model } from "mongoose";

export interface ISection extends Document {
    name: string;
    students: Schema.Types.ObjectId[];
    department: Schema.Types.ObjectId;
    semester: Schema.Types.ObjectId;
    strength: number;
}

const sectionSchema = new Schema<ISection>({
    name: {
        type: String,
        required: [true, "section name is rquired"],
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true
        }
    ],
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    semester: {
        type: Schema.Types.ObjectId,
        ref: "Semester",
        required: true
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


const Section = model('Section', sectionSchema);

export default Section