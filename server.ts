import app from "./app"
import http from "node:http"
import dotenv from "dotenv"
import { connect } from "mongoose"

dotenv.config()

const server = http.createServer(app)
const PORT = process.env.PORT || 8090

const dbConnect = async () => {
    try {
        await connect(process.env.DATABASE, {})
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}

server.listen(PORT, () => {
    dbConnect()
    console.log(`${process.env.NODE_ENV} server started at ${PORT}`)
})