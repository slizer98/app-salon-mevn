import express from 'express'
import { 
    login, 
    register, 
    veryfyAccount, 
    user, 
    forgotPassword, 
    verifyPasswordResetToken, 
    updatePassword,
    admin
} from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.get('/verify/:token', veryfyAccount)
router.post('/login', login)
router.post('/forgot-password', forgotPassword )
router.route('/forgot-password/:token')
    .get(verifyPasswordResetToken)
    .post(updatePassword)

// private
router.get('/user', authMiddleware, user)
router.get('/admin', authMiddleware, admin)

export default router