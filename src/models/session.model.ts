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
        minlength: 4,
        maxlength: 4,
    },
    stream: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
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

// Add a unique compound index on 'from' and 'stream'
sessionSchema.index({ from: 1, stream: 1 }, { unique: true });

sessionSchema.pre<ISession>("save", function (next: NextFunction) {
    if (this.from > this.to) return next(new AppError("starting year must be less than end year", 403))
    this.to = this.from + 4
    next()
})

sessionSchema.pre<ISession>(/^find/, function (next) {
    this.populate({ path: "stream", select: "name shortName -_id" })
    next();
});

const Session = model("Session", sessionSchema)

export default Session