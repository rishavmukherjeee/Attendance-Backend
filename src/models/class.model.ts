import { Document, Schema, model } from 'mongoose';
import { IDepartment, departmentSchema } from './department.model';
import { ISection, sectionSchema } from './section.model';
import { ISubject, subjectSchema } from './subject.model';
import { ISemester, semesterSchema } from './semester.model';

export interface IClass extends Document {
    className: string;
    department: {
        name: string;
        shortName: string;
    };
    totalClass: number;
    section: ISection;
    semester: ISemester;
    subject: ISubject;
    time: String;
    day: string[];
}

export const classSchema = new Schema<IClass>({
    className: {
        type: String,
        required: [true, "Class name is required"],
    },
    time: {
        type: String,
        required: true
    },
    day: [
        {
            type: String,
        }
    ],
    department: {
        name: {
            type: String
        },
        shortName: {
            type: String
        }
    },
    section: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    totalClass: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});

// classSchema.index({ semester: 1, 'department.name': 1, subject: 1 }, { unique: true });

const Class = model("Class", classSchema);

export default Class;