import { Request, Response, NextFunction } from "express"

import Reservas, { IReservas } from "../models/Reservations"

declare global {
    namespace Express {
        interface Request {
            reservation: IReservas
        }
    }
}

export async function reservationExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { reservationId } = req.params;
        const reservation = await Reservas.findById(reservationId);

        if (!reservation) {
            const error = new Error('No se encontro la reservacion');
            res.status(404).json({error: error.message})
            return
        }

        req.reservation = reservation;
        next()
    } catch (error) {
        res.status(500).json({error: 'Hubo un error en middleware'})
    }
}