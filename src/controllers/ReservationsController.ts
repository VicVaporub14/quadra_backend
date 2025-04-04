import type { Request, Response } from "express"
import Reservas from "../models/Reservations"

class ReservationsController {

    static async createNewReservation(req: Request, res: Response) {
        const newReservation = new Reservas(req.body)
        try {
            await newReservation.save();
            res.send('Reserva creada correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static async getAllReservations(req: Request, res: Response) {
        try {
            const reservations = await Reservas.find()
            res.json(reservations)
        } catch (error) {
            console.log(error)
        }
    }

    static async getReservationById(req: Request, res: Response) {
        const id = req.params
        try {
            const reservation = await Reservas.findById(id)
            res.send(reservation)
        } catch (error) {
            console.log(error)
        }
    }

    static async updateReservation(req: Request, res: Response) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
    
}


export default ReservationsController;