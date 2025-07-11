import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt"
import { NextFunction } from "express";

export interface ITeacher extends Document {
    firstname: string;
    lastname: string;
    teacherID: string;
    dob: Date;
    email: string;
    phone: Number;
    address: string;
    password: string;
    subjects: Schema.Types.ObjectId[];
    assignedClasses: Schema.Types.ObjectId[];
    department: string;
    role: string;
    status: string;
    isAdmin: boolean,
    isPasswordValid: (password: string) => Promise<Error | boolean>;
}

const teacherSchema = new Schema<ITeacher>({
    firstname: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "first name must be atleast 3 character"],
        maxlength: [16, "first name must be less than 16 character"],
        trim: true,
    },
    lastname: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "last name must be atleast 3 character"],
        maxlength: [16, "last name must be less than 16 character"],
        trim: true,
    },
    teacherID: {
        type: String,
        minlength: 6,
        maxlength: 10,
        required: true
    },
    dob: {
        type: Date,
        required: [true, "Age is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        validate: {
            validator: function (value: string) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(value)
            },
            message: (props: any) => `${props.value} is not a valid email!`
        }
    },
    phone: {
        type: Number,
        required: [true, "Phone is required"],
        minlength: [10, "phone number must be 10 digits"],
        trim: true,
        unique: true,
    },
    address: {
        type: String,
        default: "",
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 8,
    },
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subject"
        }
    ],
    assignedClasses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Class"
        }
    ],
    role: {
        type: String,
        enum: ["FACULTY", "HOD", "DIRECRTOR"],
        default: "FACULTY"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["PENDING", "ACTIVE", "CANCELLED", "SUSPENDED"],
        default: "PENDING"
    },
    department: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
    }
)

teacherSchema.pre<ITeacher>('save', async function (next: NextFunction) {
    if (!this.isModified("password")) return next()
    const hashPassword = await bcrypt.hash(this.password, 10)
    this.password = hashPassword
    next()
})

teacherSchema.pre<ITeacher>(/^find/, function (next: NextFunction) {
    this.populate({ path: "assignedClasses", select: "-__v -createdAt -updatedAt" })
    next()
})

teacherSchema.virtual("age").get(function () {
    if (this.dob) {
        const today = new Date();
        const birthDate = new Date(this.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    return undefined;
});

teacherSchema.methods.isPasswordValid = async function (password: ITeacher['password']): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password)
}

const Teacher = model("Teacher", teacherSchema)

export default Teacher