import app from "./app"
import http from "node:http"
import dotenv from "dotenv"
import { connect } from "mongoose"

dotenv.config()

const server = http.createServer(app)
const PORT = process.env.PORT || 8090

const DB_URL = process.env.NODE_ENV === "dev" ? process.env.DATABASE_TEST : process.env.DATABASE_PROD

const dbConnect = async () => {
    try {
        await connect(DB_URL, {})
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}

server.listen(PORT, () => {
    dbConnect()
    console.log(`${process.env.NODE_ENV} server started at ${PORT}`)
})