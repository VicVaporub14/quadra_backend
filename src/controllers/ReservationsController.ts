import type { Request, Response } from "express"
import Reservas from "../models/Reservations"
import { prisma } from "../lib/prisma";

class ReservationsController {

    static async createNewReservation(req: Request, res: Response) {
        try {
            const newReservation = new Reservas(req.body)
            await newReservation.save();
            res.send('Reserva creada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al crear la reserva'})
        }
    }

    static async getAllReservations(req: Request, res: Response) {
        try {
            const reservations = await Reservas.find()
            res.json(reservations)
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Hubo un error al obtener las reservas'})
        }
    }

    static async getReservationById(req: Request, res: Response) {
        const { id } = req.reservation
        try {
            // Buscar la reservación por ID
            const reservation = await Reservas.findById(id);

            if (!reservation) {
                const error = new Error('Reservación no encontrada');
                res.status(404).json({ error: error.message });
                return;
            }

            // Buscar el vehículo relacionado con la reservación
            const vehiculo = await prisma.vehiculo.findFirst({
                where: { id: reservation.vehiculo_id },
                include: {
                    seguro: true
                }
            });

            if (!vehiculo) {
                const error = new Error('Vehículo no encontrado');
                res.status(404).json({ error: error.message });
                return;
            }

            // Combinar los datos de la reservación con los datos del vehículo
            const reservationWithVehicle = {
                ...reservation.toObject(), // Convierte el documento de Mongoose a un objeto plano
                vehiculo, // Agrega los datos del vehículo
            };

            res.json(reservationWithVehicle);
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener la reserva'})
        }
    }

    static async updateReservation(req: Request, res: Response) {
        try {
            req.reservation.nombre = req.body.nombre;
            req.reservation.email = req.body.email;
            req.reservation.telefono = req.body.telefono;
            req.reservation.vehiculo_id = req.body.vehiculo_id;
            req.reservation.fecha_inicio = req.body.fecha_inicio;
            req.reservation.fecha_fin = req.body.fecha_fin;
            req.reservation.estado = req.body.estado;
            req.reservation.alquiler = req.body.alquiler;

            await req.reservation.save()

            res.send('Reservacion Actualizada Correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Hubo un error al actualizar la reserva'})
        }
    }

    static async deleteReservation(req: Request, res: Response) {
        try {
            await req.reservation.deleteOne()
            res.send('Reservacion eliminada correctamente')
        } catch (error) {
            console.log(error)
            // res.status(500).json({error: 'Hubo un error al eliminar la reserva'})
        }
    }
    
}


export default ReservationsController;