import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class BranchesController {

    static async createNewBranch(req: Request, res: Response) {
        try {
            const newBranch = await prisma.sucursal.create({
                data: req.body
            })
            res.status(201).json('Sucursal creada correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al crear la sucursal'})
        }
    }

    static async getAllBranches(req: Request, res: Response) {
        try {
            const branches = await prisma.sucursal.findMany();
            res.status(200).json(branches);
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al obtener las sucursales'})
        }    
    }

    static async getBranchById(req: Request, res: Response) {

        const { id } = req.params
        try {
            const branch = await prisma.sucursal.findFirst({
                where: id
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al obtener la sucursal'})
        }
    }
}