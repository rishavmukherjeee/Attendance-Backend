import { Request, Response, NextFunction } from 'express';
import Attendance, { IAttendance } from '../models/attendance.model';
import { IToken } from '../utils/auth';
import ClassAttendance from '../models/classAttendance.model';
import AppError from '../utils/app-error';
import Class from '../models/class.model';
import mongoose from 'mongoose';

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

const getAttendanceList = async (req: Request & { user: IToken }, res: Response, next: NextFunction) => {
    try {
        const classId = req.params.id
        const classAttendance = await ClassAttendance.find({ classInfo: classId }).sort({ createdAt: -1 }).select("attendance -_id Date").populate({ path: 'attendance', select: " student isPresent" })
        if (!classAttendance) return next(new AppError("Not found", 404))
        res.status(200).json(classAttendance)
    } catch (error) {
        return next(new AppError(error.message, error.status))
    }
}

const generateReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { semester, department, section } = req.query
        let startDate = new Date(req.query.startDate as string)
        let endDate = new Date(req.query.endDate as string)
        if (!semester || !department || !section) return next(new AppError('query missing or invalid', 400))
        if (!endDate) endDate = new Date
        if (startDate >= endDate) return next(new AppError("start date cannot be equal ot greater to end date", 400))
        let totalSubjectWiseClassConducted = {}
        const classData = await ClassAttendance.aggregate([
            {
                $match: {
                    Date: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $lookup: {
                    from: "classes",
                    localField: 'classInfo',
                    foreignField: '_id',
                    as: "classDetails"
                }
            },
            {
                $unwind: "$classDetails"
            },
            {
                $match: {
                    'classDetails.department.shortName': department,
                    'classDetails.section': section,
                    'classDetails.semester': parseInt(String(semester))
                }
            },
            {
                $group: {
                    _id: { classId: "$classDetails._id", subject: "$classDetails.subject" },
                    count: { $sum: 1 }
                }
            }
        ])
        classData.map((data) => {
            const subject = data._id.subject
            return totalSubjectWiseClassConducted[subject] = { classId: data._id.classId, count: data.count }
        })
        // const result = Promise.all(classData.map(async (data) => {

        const processedData = await Attendance.aggregate([
            {
                $match: {
                    updatedAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $lookup: {
                    from: "students",
                    localField: "student",
                    foreignField: "_id",
                    as: "studentDetails"
                }
            },
            {
                $unwind: "$studentDetails"
            },
            {
                $lookup: {
                    from: "classes",
                    localField: "classInfo",
                    foreignField: "_id",
                    as: "classDetails"
                }
            },
            {
                $unwind: "$classDetails"
            },
            {
                $group: {
                    _id: {
                        studentId: "$studentDetails._id",
                        studentName: "$studentDetails.name",
                        subject: "$classDetails.subject",
                    },
                    totalAttendance: { $sum: { $cond: { if: "$isPresent", then: 1, else: 0 } } },
                    totalClasses: {
                        $sum: {
                            $cond: {
                                if: {
                                    $in: [
                                        "$classDetails.subject",
                                        Object.keys(totalSubjectWiseClassConducted)
                                    ]
                                },
                                then: {
                                    $let: {
                                        vars: {
                                            subjectData: {
                                                $arrayElemAt: [
                                                    {
                                                        $filter: {
                                                            input: {
                                                                $objectToArray: totalSubjectWiseClassConducted
                                                            },
                                                            cond: {
                                                                $eq: ["$$this.k", "$classDetails.subject"]
                                                            }
                                                        }
                                                    },
                                                    0
                                                ]
                                            }
                                        },
                                        in: "$$subjectData.v.count"
                                    }
                                },
                                else: 0
                            }
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        studentId: "$_id.studentId",
                        studentName: "$_id.studentName",
                    },
                    subjects: {
                        $push: {
                            subject: "$_id.subject",
                            overallAverageAttendance: {
                                $round: {
                                    $multiply: [{ $divide: ["$totalAttendance", "$totalClasses"] }, 100]
                                }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    studentId: "$_id.studentId",
                    studentName: "$_id.studentName",
                    subjects: 1
                }
            }
        ]);
        // return processedData
        // }))

        if (!Class) return next(new AppError("Not found", 404))
        res.status(200).json(processedData)
    } catch (error) {
        return next(new AppError(error.message, error.status))
    }
}

export { createAttendance, getAttendanceList, generateReport }