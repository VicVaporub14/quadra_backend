
import { Router } from "express";
import { MaintenanceController } from "../controllers/MaintenanceController";
import { body } from "express-validator";

const router = Router();

router.post('/',
    body('vehiculo_id')
        .notEmpty().withMessage('El vehiculo es obligatorio'),
    body('tipo')
        .notEmpty().withMessage('El tipo de mantenimiento es obligatorio'),
    body('costo')
        .isNumeric().withMessage('El costo del mantenimiento es obligatorio'),
    body('kilometraje')
        .isNumeric().withMessage('El kilometraje es obligatorio'),
    body('notas')
        .notEmpty().withMessage('Agrege al menos una nota es obligatorio'),
    MaintenanceController.createMaintenance
)

router.get('/',
    MaintenanceController.getAllMaintenances
)

export default router