import type { Request, Response } from 'express';
import { prisma} from '../lib/prisma'

export class InsurancesController {

    static async createInsurance(req: Request, res: Response) {
        const { tipo, cobertura, precio, descripcion } = req.body;
        
        try {
            const newInsurance = await prisma.seguro.create({
                data: {
                    tipo,
                    cobertura,
                    precio,
                    descripcion
                }
            });
            res.status(201).json('Seguro dado de alta correctamente');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al crear el seguro' });
        }
    }

    static async getAllInsurances(req: Request, res: Response) {
        try {
            const Insurances = await prisma.seguro.findMany();
            res.status(200).json(Insurances);
        } catch (error) {
            console.log(error);
            res.status(500).json({error: "Error al obtener los seguros"})
        }
    }

    static async getInsuranceById(req: Request, res: Response) {

        const { id } = req.insurance;
        try {
            const seguro = await prisma.seguro.findFirst({
                where: { id }
            })

            if (!seguro) {
                const error = new Error('Error al encontrar el auto')
                res.status(404).json({error: error.message})
                return
            }

            res.status(200).json(seguro)

        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al obtener el seguro'})
        }
    }

    static async updateInsurance(req: Request, res: Response) {
        const { id } = req.insurance;
        try {
            await prisma.seguro.update({
                where: { id },
                data: {
                    tipo: req.body.tipo,
                    cobertura: req.body.cobertura,
                    precio: parseFloat(req.body.precio),
                    descripcion: req.body.descripcion
                }
            });

            res.status(200).json("Seguro actualizado correctamente");

        } catch (error) {
            console.log(error);
            res.status(500).json({error: "Error al actualizar el seguro"})
        }
    }

    static async deleteInsurance(req: Request, res: Response) {
        const { id } = req.insurance;
        try {
            await prisma.seguro.delete({
                where: { id }
            })

            res.status(200).send('Seguro eliminado correctamente')

        } catch (error) {
            console.log(error);
            res.status(500).json({error: "Error al eliminar el seguro"})
        }
    }
}