import express from "express";
import dotenv from 'dotenv';
import colors from 'colors'
import cors from 'cors'
import { db } from "./config/db.js";
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import authRoutes from './routes/appointmentRoutes.js'
dotenv.config();

const app = express()
app.use(express.json())
db()

const whiteList = [process.env.FRONTEND_URL, undefined]
const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'), false)
        }
    }
}
app.use(cors(corsOptions))

app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes) 
app.use('/api/appointments', appointmentRoutes) 


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(colors.cyan('Server running in PORT:'), PORT)
})