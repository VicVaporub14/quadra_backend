import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { Seguro } from "@prisma/client";

declare global {
    namespace Express {
        interface Request {
            insurance: Seguro
        }
    }
}

export async function insuranceExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { insuranceId } = req.params;
        const insurance = await prisma.seguro.findFirst({
            where: {
                id: Number(insuranceId),
            },
        })

        if (!insurance) {
            const error = new Error('Seguro no encontrado')
            res.status(404).json({error: error.message})
            return
        }
        req.insurance = insurance;
        next();
        
    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}