import { Request, Response } from "express";
import Mantenimiento from "../models/Maintenance";

export class MaintenanceController {
    static createMaintenance = async (req: Request, res: Response) => {
        const { vehiculo_id, mantenimiento } = req.body;
        const { tipo, costo, kilometraje, notas } = mantenimiento
        console.log(vehiculo_id);
        console.log(mantenimiento);
        try {
            // Buscar si ya existe un mantenimiento para el vehiculo_id
            const existingMaintenance = await Mantenimiento.findOne({ vehiculo_id });

            if (existingMaintenance) {
                // Si existe, agregar el nuevo mantenimiento a la lista de mantenimientos
                existingMaintenance.mantenimientos.push({ 
                    tipo, 
                    costo, 
                    kilometraje,
                    status: "pendiente",
                    notas 
                });

                await existingMaintenance.save();
                res.status(200).send('Mantenimiento agregado al registro existente');
            } else {
                // Si no existe, crear un nuevo registro de mantenimiento
                const newMaintenance = new Mantenimiento({
                    vehiculo_id,
                    mantenimientos: [{ 
                        tipo, 
                        costo, 
                        kilometraje,
                        notas 
                     }],
                });
                await newMaintenance.save();
                res.status(201).send('Mantenimiento creado correctamente');
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al crear o actualizar el mantenimiento' });
        }
    };

    static getAllMaintenances = async (req:Request, res: Response) => {
        try {
            const maintenances = await Mantenimiento.find()
            res.json(maintenances)
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: ' Error al obtener todos los mantenimientos'})
        }
    };

    static getMaintenanceById = async (req: Request, res: Response) => { // Pendiente agregar middleware
        const { maintenanceId } = req.params
        try {
            const maintenance = await Mantenimiento.findById(maintenanceId)
            res.json(maintenance)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al obtener el mantenimiento'})
        }
    }
}

