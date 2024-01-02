import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    const info = await transporter.sendMail({
        from: 'AppSalon <cuentas@appsalon.com>',
        to: email,
        subject: 'AppSalon - Confirma tu cuenta',
        text: 'AppSalon - Confirma tu cuenta',
        html: `
            <p>Hola: ${name}, confirma tu cuenta en AppSalon</p>
            <p>Tu cuenta esta casi lista, solo debes confirmarla en es siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar Cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignoral este mensaje</p>
            `
    })

    console.log('Mensaje enviado', info.messageId)
}

export async function sendEmailPasswordReset({ name, email, token }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    const info = await transporter.sendMail({
        from: 'AppSalon <cuentas@appsalon.com>',
        to: email,
        subject: 'AppSalon - Reestablece tu contraseña',
        text: 'AppSalon - Reestablece tu contraseña',
        html: `
            <p>Hola: ${name}, has solicitado reestablecer tu contraseña en  AppSalon</p>
            <p>Sigue el siguiente enlace para generar una nueva contraseña</p>
            <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Reestablecer Contraseña</a>
            <p>Si tu no ssolicitaste esto, puedes ignoral este mensaje</p>
            `
    })

    console.log('Mensaje enviado', info.messageId)
}

