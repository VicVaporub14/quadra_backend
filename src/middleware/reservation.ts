import { Request, Response, NextFunction } from "express"
import { prisma } from "../lib/prisma";
import Reservas, { IReservas } from "../models/Reservations"
import { isValidObjectId } from "mongoose";

declare global {
    namespace Express {
        interface Request {
            reservation: IReservas
        }
    }
}

// middleware/reservation.ts
export async function reservationExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { reservationId } = req.params;

        // Validar formato del ID
        if (!isValidObjectId(reservationId)) {
            const error = new Error("ID de reserva inválido");
            return res.status(400).json({ error: error.message });
        }

        const reservation = await Reservas.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        // Verificar relación con PostgreSQL (Opcional)
        const usuario = await prisma.usuario.findUnique({
            where: { id: reservation.usuario_id }
        });
        
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario asociado no existe' });
        }

        req.reservation = reservation;
        next();
    } catch (error) {
        res.status(500).json({ 
            error: 'Error en el middleware',
            detalles: error instanceof Error ? error.message : 'Error desconocido' 
        });
    }
}

export async function validateReservation(req: Request, res: Response, next: NextFunction) {
    const { usuario_id, vehiculo_id } = req.body;
    
    try {
        // Validar existencia del usuario
        if (usuario_id) {
            const usuario = await prisma.usuario.findUnique({
                where: { id: Number(usuario_id) }
            });
            if (!usuario) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }
        }

        // Validar existencia del vehículo
        if (vehiculo_id) {
            const vehiculo = await prisma.vehiculo.findUnique({
                where: { id: Number(vehiculo_id) }
            });
            if (!vehiculo) {
                res.status(404).json({ error: 'Vehículo no encontrado' });
                return;
            }
        }

        next();
    } catch (error) {
        res.status(500).json({ 
            error: 'Error de validación',
            detalles: error instanceof Error ? error.message : 'Error desconocido' 
        });
    }
}