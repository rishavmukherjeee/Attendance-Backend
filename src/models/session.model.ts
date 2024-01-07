import { NextFunction } from "express";
import { Schema, Document, model } from "mongoose";
import AppError from "../utils/app-error";

export interface ISession extends Document {
    from: number;
    to: number;
    stream: Schema.Types.ObjectId;
    course: string;
}

const sessionSchema = new Schema<ISession>({
    from: {
        type: Number,
        default: new Date().getFullYear(),
        minlength: 4,
        maxlength: 4,
        required: true,
    },
    to: {
        type: Number,
        default: new Date().getFullYear() + 4,
        minlength: 4,
        maxlength: 4,
    },
    stream: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    course: {
        type: String,
        default: "B.Tech"
    }
},
    {
        timestamps: true
    }
)

sessionSchema.pre<ISession>("save", function (next: NextFunction) {
    if (this.from > this.to) return next(new AppError("starting year must be less than end year", 403))
    next()
})

const Session = model("Session", sessionSchema)

export default Session