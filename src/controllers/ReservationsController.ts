import type { Request, Response } from "express"
import Reservas from "../models/Reservations"

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
        console.log(id)
        try {
            const reservation = await Reservas.findById(id)

            if (!reservation) {
                const error = new Error('Reservacion no encontrada')
                res.status(404).json({error: error.message})
                return
            }

            res.send(reservation)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener la reserva'})
        }
    }

    static async updateReservation(req: Request, res: Response) {
        try {
            req.reservation.vehiculo_id = req.body.vehiculo_id;
            req.reservation.cliente_id = req.body.cliente_id;
            req.reservation.seguro_id = req.body.seguro_id;
            req.reservation.fecha_inicio = req.body.fecha_inicio;
            req.reservation.fecha_fin = req.body.fecha_fin;
            req.reservation.estado = req.body.estado;
            req.reservation.alquiler = req.body.alquiler;

            await req.reservation.save()

            res.send('Reservacion Actualizada Correctamente')
        } catch (error) {
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