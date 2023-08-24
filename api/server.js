const { SERVER_PORT } = require("./config")
const db = require("./config/db")
const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const routes = require("./routes")

const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/v1", routes)

app.listen(SERVER_PORT, () => {
    console.log(`servidor conectado al puerto ${SERVER_PORT}`)
})

db()