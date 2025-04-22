import { Request, Response, NextFunction } from "express";

import Mantenimiento, { IMantenimiento } from "../models/Maintenance";

declare global {
    namespace Express {
        interface Request {
            maintenance: IMantenimiento
        }
    }
}

export async function maintenanceExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { maintenanceId } = req.params;
        const maintenance = await Mantenimiento.findById(maintenanceId)
        
        if (!maintenance) {
            const error = new Error('No se encontro el mantenimiento del vehiculo')
            res.status(404).json({error: error.message})
            return
        }

        req.maintenance = maintenance;
        next()
    } catch (error) {
        res.status(500).json({error: 'Hubo un error en middleware Maintenance'})
    }
}