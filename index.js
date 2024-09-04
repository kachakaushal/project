import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'

//configure env
dotenv.config()

//database config 
connectDB();

// rest object
const app = express()

//middelwares
app.use(morgan('dev'))
app.use(express.json())

//routes
app.use('/api/v1/auth', authRoutes)

//rest api
app.get('/', function (req, res) {
    res.send("hello world")
})
const port = process.env.port
app.listen(port)