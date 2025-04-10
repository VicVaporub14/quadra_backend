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
        const id = req.params
        try {
            const reservation = await Reservas.findById(id)
            res.send(reservation)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener la reserva'})
        }
    }

    static async updateReservation(req: Request, res: Response) {
        try {
            
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al actualizar la reserva'})
        }
    }

    static async deleteReservation(req: Request, res: Response) {
        try {
            
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al eliminar la reserva'})
        }
    }
    
}


export default ReservationsController;