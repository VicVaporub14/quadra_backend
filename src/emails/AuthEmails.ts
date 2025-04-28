import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string,
    name: string,
    token: string
}

export class AuthEmail {
    
    static sendConfirmationEmail = async (user: IEmail) => {
        const info = await transporter.sendMail({
            from: 'Quadra <admin@quadra.com>',
            to: user.email,
            subject: 'Quadra - Confirma tu cuenta',
            text: 'Confirma tu cuenta',
            html: `<p>Hola: ${user.name}, has creado tu cuenta en Quadra, ya casi esta todo listo, solo debes confirmar tu cuenta</p>
                <p>Visita el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
                <p>E ingresa el codigo: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>
            `
        })
        console.log('Mensaje Enviado', info.messageId)
    }
}