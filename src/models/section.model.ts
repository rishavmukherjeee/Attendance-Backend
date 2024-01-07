import { Schema, Document, model } from "mongoose";

interface ISection extends Document {
    name: string;
    department: Schema.Types.ObjectId;
    strength: number;
}

const sectionSchema = new Schema<ISection>({
    name: {
        type: String,
        required: [true, "section name is rquired"],
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
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