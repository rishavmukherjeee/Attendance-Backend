import { IToken } from "../utils/auth";
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const protect = async (
    req: Request & { user: jwt.JwtPayload },
    res: Response,
    next: NextFunction
) => {
    const bearer: string = req.headers.authorization

    if (!bearer) {
        res.status(401).json({ message: 'not authorized' })
        return
    }

    const [, token] = bearer.split(' ')

    if (!token) {
        res.status(401).json({ message: 'not valid token' })
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user as IToken
        next()
    } catch (error) {
        res.status(401).json({ message: 'not valid token' })
        return
    }
}

const isAdmin = async (
    req: Request & { user: { id: string; role: string, isAdmin: boolean } },
    res: Response,
    next: NextFunction
) => {
    if (!req.user.isAdmin) {
        res.status(401).json({ message: 'not authorized' })
        return
    }
    next()
}

const isFaculty = async (
    req: Request & { user: { id: string; role: string } },
    res: Response,
    next: NextFunction
) => {
    if (req.user.role !== 'HOD' && req.user.role !== 'DIRECTOR') {
        res.status(401).json({ message: 'not authorized' })
        return
    }
    next()
}

const isStudent = async (
    req: Request & { user: { id: string; role: string } },
    res: Response,
    next: NextFunction
) => {
    if (req.user.role !== '') {
        res.status(401).json({ message: 'not authorized' })
        return
    }
    next()
}

export { isAdmin, isFaculty, isStudent, protect }