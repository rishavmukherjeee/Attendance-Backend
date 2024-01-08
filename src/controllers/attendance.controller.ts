import { Request, Response, NextFunction } from 'express';
import Attendance, { IAttendance } from '../models/attendance.model';

const createAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { isPresent } = req.body;
        const attendance: IAttendance = new Attendance({ isPresent });
    } catch (error) {

    }
}