import express from 'express'
import { getUserAppointments } from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/:user/appointments')
    .get(authMiddleware, getUserAppointments)

export default router