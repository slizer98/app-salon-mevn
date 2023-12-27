import express  from "express";
import { createAppointment, getAppointmentByDate, getAppointmentById } from "../controllers/appointmentController.js"; 
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router()

router.route('/')
    .post(authMiddleware, createAppointment)
    .get(authMiddleware, getAppointmentByDate)

router.route('/:id')
    .get(authMiddleware, getAppointmentById)

export default router