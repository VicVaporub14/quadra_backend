import { Request, Response } from "express"
import { checkPassword, hashPassword } from "../utils/auth";
import { prisma } from "../lib/prisma";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmails";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            // Prevenir duplicados
            const userExists = await prisma.usuario.findFirst({
                where: { email }
            })
            if (userExists) {
                const error = new Error('El correo electronico ya esta registrado a una cuenta')
                res.status(409).json({error: error.message})
            }

            // Hash del Password
            const passwordHashed = await hashPassword(password)

            // Si no existe, crea un usuario nuevo
            const user = await prisma.usuario.create({
                data: {
                    nombre: req.body.name,
                    email: req.body.email,
                    password: passwordHashed,
                }
            })

            // Generar el token

            const token = await prisma.token.create({
                data: {
                    token: generateToken(),
                    userId: user.id
                }
            })

            // Enviar email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.nombre,
                token: token.token
            })

            res.send('Cuenta creada correctamente')

        } catch (error) {
            res.status(500).json('Error al crear la cuenta')
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;
            const tokenExists = await prisma.token.findFirst({
                where: { token }
            })

            if (!tokenExists) {
                const error = new Error('Token no valido')
                res.status(404).json({error: error.message})
                return
            }

            await prisma.usuario.update({
                where: { id: tokenExists.userId },
                data: {
                    confirmado: true
                }
            })

            await prisma.token.delete({
                where: { id: tokenExists.id}
            })

            res.send('Cuenta Confirmada Correctamente')

        } catch (error) {
            res.status(500).json('Hubo un error al confirmar la cuenta')
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await prisma.usuario.findFirst({
                where: { email }
            })

            if (!user) {
                const error = new Error('Usuario no encontrado')
                res.status(404).json({error: error.message})
                return
            }

            if (!user.confirmado) {
                // Crear Token
                const token = await prisma.token.create({
                    data: {
                        token: generateToken(),
                        userId: user.id
                    }
                })

                // Enviar Email
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.nombre,
                    token: token.token
                })

                const error = new Error('La cuenta aun no ha sido confirmada, hemos mandado nuevamente un correo de confirmacion')
                res.status(401).json({error: error.message})
                return
            }

            const isPasswordCorrect = await checkPassword(password, user.password)
            if (!isPasswordCorrect) {
                const error = new Error('La contraseña es incorrecta')
                res.status(401).json({error: error.message})
                return
            }

            res.send('Inicio de Sesion exitoso')

        } catch (error) {
            res.status(500).json('Hubo un error al Iniciar Sesion')
        }
    }
}