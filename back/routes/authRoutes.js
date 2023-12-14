import express from 'express'
import { login, register, veryfyAccount, user } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.get('/verify/:token', veryfyAccount)
router.post('/login', login)

// private
router.get('/user', authMiddleware, user)

export default router