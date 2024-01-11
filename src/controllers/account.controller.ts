import { NextFunction, Request, Response } from "express";
import Student, { IStudent } from "../models/student.model";
import Teacher, { ITeacher } from "../models/teacher.model";
import AppError from "../utils/app-error";
import { generateToken } from "../utils/auth";

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

const teacherRegistration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: ITeacher = new Teacher({
            ...req.body
        })
        const result = await user.save()
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

const teacherLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const user: ITeacher = await Teacher.findOne({ email })

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

export { studentLogin, teacherLogin, teacherRegistration, studentRegistration }