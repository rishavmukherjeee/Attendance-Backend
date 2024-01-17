import { NextFunction, Request, Response } from "express";
import Student, { IStudent } from "../../models/student.model";
import AppError from "../../utils/app-error";
import { IToken, generateToken } from "../../utils/auth";

const studentRegistration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: IStudent = new Student({
            dob: new Date(req.body.dob),
            ...req.body,
        })
        const result = await user.save()
        result.password = undefined
        res.status(201).send(result)
    } catch (error) {
        next(new AppError(`${error.message}`, 400))
    }
}

const studentLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const user: IStudent = await Student.findOne({ email })

        if (!user) return next(new AppError("user not found", 404))

        const isValid = await user.isPasswordValid(password)

        if (!isValid) return next(new AppError("password is incorrect", 401))

        const token = generateToken(user)

        return res.status(200).json({ token })

    } catch (error) {
        if (
            error.message === 'user not found' ||
            error.message === 'password is incorrect'
        ) {
            next(new AppError(error.message, 404))
        } else {
            next(new AppError(error.message, 500))
        }
    }
}
const getStudent = async (req: Request & { user: IToken }, res: Response, next: NextFunction) => {
    try {
        const student = await Student.findById(req.user.id).select("-password -__v -_id -createdAt -updatedAt")
        res.status(200).json(student)
    } catch (error) {
        next(new AppError(error.message, 500))
    }
}

export { getStudent, studentLogin, studentRegistration }