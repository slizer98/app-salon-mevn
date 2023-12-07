import express from 'express'
import { login, register, veryfyAccount } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', register)
router.get('/verify/:token', veryfyAccount)
router.post('/login', login)

export default router