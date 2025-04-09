import { Usuario } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

declare global {
    namespace Express {
        interface Request {
            user: Usuario;
        }
    }
}

export async function userExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;

        const user = await prisma.usuario.findFirst({
            where: { id: Number(userId) }
        })

        if (!user) {
            const error = new Error('Usuario no encontrado desde middleware')
            res.status(404).json({error: error.message})
            return
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(500).json({error: 'Hubo un error en middleware'})
    }
}