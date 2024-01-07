import express from "express";
import morgan from "morgan";
import { ErrorRequestHandler } from "express";
import accountRouter from "./src/routes/accounts.route"

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

app.use('/api/v2/accounts', accountRouter)

app.get('/', (req, res) => {
    res.send("hello")
})

app.use(errorHandler)

export default app