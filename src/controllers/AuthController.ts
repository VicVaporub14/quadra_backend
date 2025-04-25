import { Request, Response } from "express"
import { prisma } from "../lib/prisma";
import { hashPassword } from "../utils/auth";

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
            await prisma.usuario.create({
                data: {
                    nombre: req.body.name,
                    email: req.body.email,
                    password: passwordHashed,
                }
            })

            // // Generar el token
            // const token = new Token()
            // token.token = generateToken()
            // token.user = user.id

            // // Enviar email
            // AuthEmail.sendConfirmationEmail({
            //     email: user.email,
            //     name: user.name,
            //     token: token.token
            // })

            res.send('Cuenta creada correctamente')
        } catch (error) {
            res.status(500).json('Error al crear la cuenta')
        }
    }
}