import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import Reservas from '../models/Reservations';

class CarController {

    static async createCar(req: Request, res: Response) {
        try {
            const newCar = await prisma.vehiculo.create({
                data: req.body
            });
            res.status(201).send('Vehiculo Creado Correctamente');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al crear el coche' });
        }
    }

    static async getAllCars(req: Request, res: Response) {
        try {
            const cars = await prisma.vehiculo.findMany({
                include: {
                    seguro: true
                }
            });
            res.status(201).send(cars)
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al obtener todos los carros'})
        }
    }

    static async getCarById(req: Request, res: Response) {
        const { id } = req.car;
        try {
            const car = await prisma.vehiculo.findFirst({
                where: { id },
                include: {
                    seguro: true
                }
            })

            if (!car) {
                const error = new Error('No se encontro el vehiculo')
                res.status(404).json({error: error.message})
                return
            }
            res.status(200).json(car)

        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al obtener el vehiculo'})
        }
    }

    static async updateCar(req: Request, res: Response) {
        const { id } = req.car;
        try {
            const car = await prisma.vehiculo.update({
                where: { id },
                data: req.body
            })

            if (!car) {
                const error = new Error('No se encontro el vehiculo a Actualizar')
                res.status(404).json({error: error.message})
                return
            }

            res.status(200).send('Vehiculo Actualizado Exitosamente')

        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al actualizar el vehiculo'})
        }
    }

    static async deleteCar(req: Request, res: Response) {
        const { id } = req.car;
        try {
            const car = prisma.vehiculo.delete({
                where: { id }
            })

            if (!car) {
                const error = new Error('No se encontro el vehiculo a eliminar')
                res.status(404).json({error: error.message})
                return
            }

            res.status(200).send('Vehiculo eliminado exitosamente')
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al eliminar el vehiculo'})
        }
    }

}

export default CarController;