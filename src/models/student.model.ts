import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt"
import { NextFunction } from "express";

export interface IStudent extends Document {
    firstname: string;
    lastname: string;
    dob: Date;
    email: string;
    phone: Number;
    address: string;
    rollno: number;
    password: string;
    enrollmentType: string;
    subjects: Schema.Types.ObjectId[];
    session: Schema.Types.ObjectId;
    section: string | Schema.Types.ObjectId;
    attendance: Schema.Types.ObjectId[];
    isPasswordValid: (password: string) => Promise<Error | boolean>
}

const studentSchema = new Schema<IStudent>({
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
    dob: {
        type: Date,
        required: [true, "Date of birth is required"],
    },
    // age: {
    //     type: Number,
    //     required: [true, "Age is required"],
    // },
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
        required: [true, "Address is required"],
        trim: true,
    },
    rollno: {
        type: Number,
        required: [true, "roll is required"],
        unique: true
    },
    enrollmentType: {
        type: String,
        enum: ["REGULAR", "LATERAL"],
        default: "REGULAR"
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 8
    },
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subject"
        }
    ],
    session: {
        type: Schema.Types.ObjectId,
        ref: "Session"
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: "Section",
    },
    attendance: [
        {
            type: Schema.Types.ObjectId,
            ref: "Attendance",
        }
    ]
},
    {
        timestamps: true,
    }
)

studentSchema.pre<IStudent>('save', async function (next: NextFunction) {
    if (!this.isModified("password")) return next()
    const hashPassword = await bcrypt.hash(this.password, 10)
    this.password = hashPassword
    next()
})

studentSchema.methods.isPasswordValid = async function (password: IStudent['password']): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password)
}

studentSchema.virtual("age").get(function () {
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

studentSchema.set('toJSON', { virtuals: true });

const Student = model("Student", studentSchema)

export default Student