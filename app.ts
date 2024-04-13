import express, { NextFunction, Request, Response } from "express";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import morgan from "morgan";
import { ErrorRequestHandler } from "express";
import teacherRouter from "./src/routes/account/teacher.route"
import studentRouter from "./src/routes/account/student.route"
import departmentRouter from "./src/routes/department.route"
import semesterRouter from "./src/routes/semester.route"
import sessionRouter from "./src/routes/session.route"
import subjectRouter from "./src/routes/subject.route"
import sectionRouter from "./src/routes/section.route"
import classRouter from "./src/routes/class.route"
import attendanceRouter from "./src/routes/attendance.route"
import messageRouter from "./src/routes/account/messages.route"
import swaggerDefinition from './swagger.json'
import helmet from "helmet"
import { rateLimit } from 'express-rate-limit';

const app = express();

app.use(morgan("dev"));
app.use(express.json())
// app.use(helmet())
app.use(express.static(path.resolve(__dirname, "public")))


const options = {
    swaggerDefinition,
    apis: [path.resolve(__dirname, './**/*.ts')]
};

// Apply rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin (replace * with your specific origin if known)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Allow specified HTTP methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specified headers

    // Handle preflight requests (OPTIONS method)
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

if (process.argv[2] === '--dev') process.env.NODE_ENV = 'dev'
else process.env.NODE_ENV = 'prod'

app.use('/api/v2/auth/teacher', teacherRouter)
app.use('/api/v2/auth/student', studentRouter)
app.use('/api/v2/department', departmentRouter)
app.use('/api/v2/semester', semesterRouter)
app.use('/api/v2/session', sessionRouter)
app.use('/api/v2/subject', subjectRouter)
app.use('/api/v2/section', sectionRouter)
app.use('/api/v2/class', classRouter)
app.use('/api/v2/attendance', [limiter], attendanceRouter)
app.use('/api/v2/messages', messageRouter)
app.get('/', (req, res) => {
    res.send("hello")
})

if (process.env.NODE_ENV === 'dev') {
    // errorHandler for only development environment
    const errorHandlerDev: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
        res.status(err.statusCode).json({
            status: err.status,
            err: err,
            message: err.message,
            stack: err.stack,
        });
    }
    app.use(errorHandlerDev)
}
else {
    // errorHandler for only produnction environment
    const errorHandlerProd: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
        res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message
        });
    }
    app.use(errorHandlerProd)
}

export default app