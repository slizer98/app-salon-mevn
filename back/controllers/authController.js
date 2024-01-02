import User from '../models/User.js'
import { sendEmailVerification, sendEmailPasswordReset } from '../emails/authEmailService.js'
import { errorMessage, generateJWT, uniqueId } from '../utils/index.js'


const register = async(req, res) => {
    if(Object.values(req.body).includes('')) {
        errorMessage(res, 400, 'Todos los campos son obligatorios')
    }

    const { email, password, name } = req.body
    const userExists = await User.findOne({email})
    if(userExists) {
        return res.status(400).json({msg: 'El usuario ya esta registrado'})
    }

    const MIN_PASSWORD_LENGTH = 8
    if(password.trim().length < MIN_PASSWORD_LENGTH) {
        return res.status(400).json({msg: `La contraseña debe contenertener al menos ${MIN_PASSWORD_LENGTH} caracteres`})
    }
    
    try {
        const user = new User(req.body)
        const result = await user.save()
        const { name, email, token } = result
        sendEmailVerification({ name, email, token })
        res.json({
            msg: 'El usuario se creo correctamente, revisa tu e-mail.'
        })
    } catch (error) {
        console.log(error)
    }
}

const veryfyAccount = async(req, res) => {
    const { token } = req.params
    const user = await User.findOne({token})
    if(!user) {
        errorMessage(res, 401, 'Hubo un error, token no valido')
    }

    try {
        user.verified = true
        user.token = ''
        await user.save()
        res.json({msg: 'Usuario Confirmado Correctamente'})
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {

    if(Object.values(req.body).includes('')) {
        return errorMessage(res, 400, 'Todos los campos son obligatorios')
    }

    const { email, password } = req.body
    const user = await User.findOne({email})
    if(!user) {
        return errorMessage(res, 401, 'El usuario no Existe!')
    }
    if(!user.verified) {
        return errorMessage(res, 401, 'Tu cuenta no ha sido confirmada aún')
    }
    if(!await user.checkPassword(password)) {
        return errorMessage(res, 401, 'El password es incorrecto')
    }

    const token = generateJWT(user._id)
    res.json({token})
 }

 const forgotPassword = async(req, res) => {
    const { email } = req.body

    const user = await User.findOne({email})
    if(!user) {
        return errorMessage(res, 404, 'El usuario no existe')
    }

    try {
        user.token = uniqueId()
        const result = await user.save()

        await sendEmailPasswordReset({
            name: result.name,
            email: result.email,
            token: result.token
        })
        
        res.json({msg: 'Hemos enviado un email con las instrucciones'})
    } catch (error) {
        console.log(error)
    }
 }

 const verifyPasswordResetToken = async(req, res) => {
    const { token } =req.params

    const isValidToken = await User.findOne({token})
    if(!isValidToken) {
        return errorMessage(res, 400, 'Hubo un error, token no valido')
    }
    
    res.json({ msg: 'Token valido'})
 }

 const updatePassword = async(req, res) => {
    const { token } =req.params

    const user = await User.findOne({token})
    if(!user) {
        return errorMessage(res, 400, 'Hubo un error, token no valido')
    }
    const { password } = req.body
    
    try {
        user.token = ''
        user.password = password
        await user.save()

        res.json({msg: 'Contraseña actualizada correctamente'})
        
    } catch (error) {
        console.log(error)
    }
 }

 const user = async(req, res) => {
    const { user } = req
    res.json(user)
 }


export {
    register,
    veryfyAccount,
    login,
    forgotPassword,
    verifyPasswordResetToken, 
    updatePassword,
    user
}