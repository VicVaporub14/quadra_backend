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

        const { id } = req.branch
        try {
            const branch = await prisma.sucursal.findFirst({
                where: { id }
            })

            if (!branch) {
                const error = new Error('No se encontro la sucursal')
                res.status(404).json({error: error.message})
                return
            }

            res.status(200).json(branch)
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al obtener la sucursal'})
        }
    }

    static async updateBranch(req: Request, res: Response) {
        const { id } = req.branch;
        try {
            const branch = await prisma.sucursal.update({
                where: { id },
                data: req.body
            })

            res.status(200).send('Sucursal Actualizada correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al actualizar la sucursal'})
        }
    }

    static async deleteBranch(req: Request, res: Response) {
        const { id } = req.branch;
        try {
            const branch = await prisma.sucursal.delete({
                where: { id }
            })

            res.status(200).send('Sucursal eliminada correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al eliminar la sucursal'})
        }
    }
}