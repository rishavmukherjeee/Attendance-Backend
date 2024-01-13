import express from "express";
import morgan from "morgan";
import { ErrorRequestHandler } from "express";
import accountRouter from "./src/routes/accounts.route"
import departmentRouter from "./src/routes/department.route"
import semesterRouter from "./src/routes/semester.route"
import sessionRouter from "./src/routes/session.route"
import subjectRouter from "./src/routes/subject.route"
import sectionRouter from "./src/routes/section.route"

// errorHandler for only development
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.statusCode).json({
        status: err.status,
        err: err,
        message: err.message,
        stack: err.stack,
    });
}

const app = express();

app.use(morgan("dev"));
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

if (process.argv[2] === '--dev') process.env.NODE_ENV = 'dev'
else process.env.NODE_ENV = 'prod'

app.use('/api/v2/accounts', accountRouter)
app.use('/api/v2/department', departmentRouter)
app.use('/api/v2/semester', semesterRouter)
app.use('/api/v2/session', sessionRouter)
app.use('/api/v2/subject', subjectRouter)
app.use('/api/v2/section', sectionRouter)

app.get('/', (req, res) => {
    res.send("hello")
})

if (process.env.NODE_ENV === 'dev') {
    // errorHandler for only development environment
    const errorHandlerDev: ErrorRequestHandler = (err, req, res, next) => {
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
    const errorHandlerProd: ErrorRequestHandler = (err, req, res, next) => {
        res.status(500).json({
            message: 'something went wrong'
        });
    }
    app.use(errorHandlerProd)
}

export default app