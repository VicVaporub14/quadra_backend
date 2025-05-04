
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { hashPassword } from "../utils/auth";

export class UsersController {

    static async createUser(req: Request, res: Response) {
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
                    email: req.body.email,
                    telefono: req.body.telefono,
                    password: await hashPassword(req.body.password),
                    role: req.body.role || 'CUSTOMER',
                    imagen: req.body.imagen,
                    confirmado: req.body.confirmado
                }
            })
            res.status(201).send('Usuario Creado Correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al crear Usuario Administrador'})
        }
    }
    
    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await prisma.usuario.findMany({
                select: {
                    id: true,
                    nombre: true,
                    email: true,
                    role: true,
                    imagen: true,
                    confirmado: true,
                    createdAt: true,
                    updatedAt: true,
                    // Excluye el campo "password" al no incluirlo aquí
                },
            })
            res.status(201).json(users)
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al obtener todos los usuarios'})
        }
    }

    static async getUserById(req: Request, res: Response) {
        const { id } = req.user
        try {
            const user = await prisma.usuario.findFirst({
                where: { id },
                select: {
                    id: true,
                    nombre: true,
                    email: true,
                    role: true,
                    imagen: true,
                    confirmado: true,
                    createdAt: true,
                    updatedAt: true,
                    // Excluye el campo "password" al no incluirlo aquí
                },
            })
            if (!user) {
                const error = new Error('Usuario no encontrado')
                res.status(404).json({error: error.message})
                return
            }
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al obtener el usuario'})
        }
    }

    static async updateUser(req: Request, res: Response) {
        const { id } = req.user;
        try {
            await prisma.usuario.update({
                where: { id },
                // Verificar porque no hace la actualizacion
                data: req.body
            })
            res.status(200).send('Usuario actualizado correctamente')
        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'Error al actualizar el usuario'})
        }
    }

    static async deleteUser(req: Request, res: Response) {
        const { id } = req.user
        try {
            await prisma.usuario.delete({
                where: { id }
            })
            res.status(200).send('Usuario eliminado correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al eliminar el usuario'})
        }
    }
}