import { NextFunction, Request, Response } from "express";
import Mantenimiento from "../models/Maintenance";
import mongoose, { Mongoose } from "mongoose";

export class MaintenancesController {
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
                    // _id: new mongoose.Types.ObjectId(),
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
        const { carId } = req.params
        try {
            const maintenance = await Mantenimiento.findOne({ vehiculo_id: carId})
            res.json(maintenance)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al obtener el mantenimiento'})
        }
    }

    // static editMaintenance = async (req: Request, res: Response)=>{
    //     const { carId, maintenanceId } = req.params;
    //     const updates = req.body;
    
    //     try {
    //         // Validar que se envíen campos para actualizar
    //         if (!updates || Object.keys(updates).length === 0) {
    //             res.status(400).json({ error: 'No se proporcionaron datos para actualizar' });
    //         }
    
    //         // Buscar el registro de mantenimiento del vehículo
    //         const maintenanceRecord = await Mantenimiento.findOne({ vehiculo_id: carId });
    
    //         if (!maintenanceRecord) {
    //             res.status(404).json({ error: 'No se encontró el registro de mantenimiento para este vehículo' });
    //         }
    
    //         // Buscar el mantenimiento específico a editar
    //         const maintenanceToUpdate = maintenanceRecord.mantenimientos.find(m => m._id.toString() === maintenanceId);
    
    //         if (!maintenanceToUpdate) {
    //             res.status(404).json({ error: 'No se encontró el mantenimiento especificado' });
    //         }
    
    //         // Validar campos permitidos para actualización
    //         const allowedUpdates = ['tipo', 'costo', 'kilometraje', 'status', 'notas'];
    //         const isValidOperation = Object.keys(updates).every(update => 
    //             allowedUpdates.includes(update)
    //         );
    
    //         if (!isValidOperation) {
    //             res.status(400).json({ error: 'Campos de actualización no válidos' });
    //         }
    
    //         // Aplicar las actualizaciones
    //         Object.assign(maintenanceToUpdate, updates);
    
    //         await maintenanceRecord.save();
    
    //         res.status(200).json({
    //             message: 'Mantenimiento actualizado correctamente',
    //             updatedMaintenance: maintenanceToUpdate
    //         });
    
    //     } catch (error) {
    //         console.error('Error al editar mantenimiento:', error);
    //         res.status(500).json({ 
    //             error: 'Error interno al actualizar el mantenimiento',
    //             details: error instanceof Error ? error.message : String(error)
    //         });
    //     }
    // };
    // static deleteMaintenance = async (req: Request, res: Response) => {
    //     const { carId, maintenanceId } = req.params;
    
    //     try {
    //         // 1. Buscar el registro principal
    //         const maintenanceRecord = await Mantenimiento.findOne({ vehiculo_id: carId });
            
    //         if (!maintenanceRecord) {
    //             res.status(404).json({ error: 'Registro de mantenimiento no encontrado' });
    //         }
    
    //         // 2. Verificar si el mantenimiento existe
    //         const maintenanceIndex = maintenanceRecord.mantenimientos.findIndex(
    //             m => m._id.toString() === maintenanceId
    //         );
    
    //         if (maintenanceIndex === -1) {
    //             res.status(404).json({ error: 'Mantenimiento no encontrado' });
    //         }
    
    //         // 3. Eliminar el mantenimiento del array
    //         maintenanceRecord.mantenimientos.splice(maintenanceIndex, 1);
    
    //         // 4. Guardar cambios (automáticamente actualiza timestamps)
    //         await maintenanceRecord.save();
    //         res.status(200).json({
    //             message: 'Mantenimiento eliminado correctamente',
    //             deletedMaintenanceId: maintenanceId,
    //             remainingMaintenances: maintenanceRecord.mantenimientos.length
    //         });
    
    
    //     } catch (error) {
    //         console.error('Error al eliminar mantenimiento:', error);
    //         res.status(500).json({ 
    //             error: 'Error al eliminar el mantenimiento',
    //             details: error instanceof Error ? error.message : String(error)
    //         });
    //     }
    // };
}

