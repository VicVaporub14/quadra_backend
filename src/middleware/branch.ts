import { Request, Response, NextFunction } from "express";
import { Sucursal } from "@prisma/client";
import { prisma } from "../lib/prisma";

declare global {
    namespace Express {
        interface Request {
            branch: Sucursal
        }
    }
}

export async function branchExist(req: Request, res: Response, next: NextFunction) {
    
    const { branchId } = req.params;
    try {
        const branch = await prisma.sucursal.findFirst({
            where: { id: Number(branchId) }
        })

        if (!branch) {
            const error = new Error('Error desde middleware al buscar sucursal')
            res.status(404).json({error: error.message})
            return
        }

        req.branch = branch;
        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error en middleware'})
    }
}