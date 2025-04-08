
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class UsersController {
    
    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await prisma.usuario.findMany()
            res.status(201).json(users)
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al obtener todos los usuarios'})
        }
    }
}