const mongoose = require("mongoose")
const { ServerApiVersion } = require("mongodb")
const { DB_URL } = require("./index")

const db = async () => {
    try {
        mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi:{
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            }
        })
        console.log("Conectado a la DB")
    } catch (error) {
        console.log("Error al conectar a la DB ", error)
    }
}

module.exports = db;