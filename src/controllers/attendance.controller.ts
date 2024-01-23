import { Request, Response, NextFunction } from 'express';
import Attendance, { IAttendance } from '../models/attendance.model';
import { IToken } from '../utils/auth';
import ClassAttendance from '../models/classAttendance.model';
import AppError from '../utils/app-error';
import Class from '../models/class.model';

const createAttendance = async (req: Request & { user: IToken }, res: Response, next: NextFunction) => {
    try {
        const attendanceData: IAttendance[] = req.body.attendanceData
        const classId = req.body.classId
        // const options = {
        //     timeZone: 'Asia/Kolkata',
        //     hour12: true,
        // };

        // const istTime = new Date().toLocaleString('en-US', options);
        if (!attendanceData || !attendanceData?.length || !classId) return next(new AppError("Body missing", 400))
        const bulkOps = attendanceData.map((attendance) => (
            {
                insertOne: {
                    document: {
                        classInfo: classId,
                        student: attendance.student,
                        isPresent: attendance.isPresent
                    }
                }
            }
        ))
        const result = await Attendance.bulkWrite(bulkOps)
        if (!result) return next(new AppError("error uploading attendance", 500))
        const classAttendance = new ClassAttendance({ classInfo: classId, Date: new Date(), attendance: [...Object.values(result.insertedIds)] })
        await classAttendance.save()
        await Class.updateOne({ _id: classId }, { $inc: { totalClass: 1 } })
        res.status(201).json(classAttendance)
    } catch (error) {
        next(new AppError(error.message, 400))
    }
}


export { createAttendance }