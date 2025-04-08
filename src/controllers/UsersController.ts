
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { hashPassword } from "../utils/auth";

export class UsersController {

    static async createAdminUser(req: Request, res: Response) {
        try {
            const { email } = req.body;

            // Prevenir duplicados
            const userExists = await prisma.usuario.findFirst({
                where: {email}
            })

            if (userExists) {
                const error = new Error('El email que ingreso, ya se encuentra registrado')
                res.status(409).json({error: error.message})
                return
            }

            // Crea usuario administrador
            const adminUser = await prisma.usuario.create({
                data: {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    password: await hashPassword(req.body.password),
                    role: req.body.role || 'CUSTOMER',
                    imagen: req.body.imagen,
                    confirmado: req.body.confirmado
                }
            })
            res.status(201).send('Usuario Administrador Creado Correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al crear Usuario Administrador'})
        }
    }
    
    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await prisma.usuario.findMany()
            res.status(201).json(users)
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al obtener todos los usuarios'})
        }
    }

    static async getUserById(req: Request, res: Response) {
        try {
            res.send('Desde Obtener Usuario por Id')
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al obtener el usuario'})
        }
    }
}