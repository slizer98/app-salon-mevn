import express  from "express";
import { createAppointment, getAppointmentByDate } from "../controllers/appointmentController.js"; 
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router()

router.route('/')
    .post(authMiddleware, createAppointment)
    .get(authMiddleware, getAppointmentByDate)


export default router