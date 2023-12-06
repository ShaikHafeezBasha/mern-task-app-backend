const dotenv = require('dotenv').config()
const express = require('express')
const connectDB = require("./config/connectDB")
const mongoose = require("mongoose")
const Task = require("./models/taskModel")
const taskRoute = require("./routes/taskRoute")
const cors = require("cors")

const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: ["http://127.0.0.1:5173/", "https://mern-task-app.onrender.com"]
}))

app.use("/api/tasks", taskRoute)
// const logger = (req, res, next) => {
//     console.log("Middleware ran")
//     console.log(req.method)
//     next()
// }

//Routes
app.get("/", (req, res) => {
    res.send("Home Page")
})



const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })

//method-1 to connect mongoDB
// const startServer = async () => {
//     try {
//         await connectDB()
//         app.listen(PORT, () => {
//             console.log(`Server running on ${PORT}`)
//         })
//     }
//     catch (err) {
//         console.log(err)
//     }
// }
// startServer()