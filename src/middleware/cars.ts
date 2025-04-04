import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { Vehiculo } from "@prisma/client";

declare global {
    namespace Express {
        interface Request {
            car: Vehiculo
        }
    }
}

export async function carExist(req: Request, res: Response, next: NextFunction) {
    try {
        const { carId } = req.params;
        const car = await prisma.vehiculo.findFirst({
            where: {
                id: Number(carId)
            }
        })

        if (!car) {
            const error = new Error('Seguro no encontrado desde Middleware')
            res.status(404).send({error: error.message})
            return
        }

        req.car = car;
        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error en middleware'})
    }
}