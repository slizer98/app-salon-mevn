import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }) {
    const transporter = createTransport(
        "sandbox.smtp.mailtrap.io",
        2525,
        "a2afcf61895fb5",
        "fd5e9ce809f348"
    )

    const info = await transporter.sendMail({
        from: 'AppSalon',
        to: email,
        subject: 'AppSalon - Confirma tu cuenta',
        text: 'AppSalon - Confirma tu cuenta',
        html: `
            <p>Hola: ${name}, confirma tu cuenta en AppSalon</p>
            <p>Tu cuenta esta casi lista, solo debes confirmarla en es siguiente enlace:</p>
            <a href="http://localhost:3000/api/auth/verify/${token}">Confirmar Cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignoral este mensaje</p>
            `
    })

    console.log('Mensaje enviado', info.messageId)
}

