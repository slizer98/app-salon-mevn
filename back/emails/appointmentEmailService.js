import { createTransport } from "../config/nodemailer.js";

export async function sendEmailNewAppointment({date, time}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    const info = await transporter.sendMail({
        from: 'AppSalon <citas@appsalon.com>',
        to: "admin@appsalon.com",
        subject: 'AppSalon - Nueva Cita',
        text: 'AppSalon - Nueva Cita',
        html: `
            <p>Hola: Admin, tienes una nueva cita</p>
            <p>La cita sera el dia: ${date} a las ${time} horas.</p>
            `
    })

    console.log('Mensaje enviado', info.messageId)
}
export async function sendEmailUpdateAppointment({date, time}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    const info = await transporter.sendMail({
        from: 'AppSalon <citas@appsalon.com>',
        to: "admin@appsalon.com",
        subject: 'AppSalon - Cita Actualizada',
        text: 'AppSalon - Cita Actualizada',
        html: `
            <p>Hola: Admin, un cliente actualizo su cita.</p>
            <p>La cita se actualizo para el dia: ${date} a las ${time} horas.</p>
            `
    })

    console.log('Mensaje enviado', info.messageId)
}
export async function sendEmailCancelAppointment({date, time}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    const info = await transporter.sendMail({
        from: 'AppSalon <citas@appsalon.com>',
        to: "admin@appsalon.com",
        subject: 'AppSalon - Cita Cancelada',
        text: 'AppSalon - Cita Cancelada',
        html: `
            <p>Hola: Admin, Un usuario cancelo una cita.</p>
            <p>La cita que se cancelo era del dia: ${date} a las ${time} horas.</p>
            `
    })

    console.log('Mensaje enviado', info.messageId)
}