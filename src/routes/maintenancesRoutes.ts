
import { Router } from "express";
import { body } from "express-validator";
import { maintenanceExists } from "../middleware/maintenance";
import { MaintenancesController } from "../controllers/MaintenancesController";

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
    MaintenancesController.createMaintenance
)

router.get('/',
    MaintenancesController.getAllMaintenances
)

router.param('carId', maintenanceExists)

router.get('/:carId',
    MaintenancesController.getMaintenanceById
)

// router.patch('/:carId/:maintenanceId',
//     // Validaciones específicas para PATCH
//     body('tipo').optional().notEmpty(),
//     body('costo').optional().isNumeric(),
//     body('status').optional().isIn(['pendiente', 'enProgreso', 'completado']),
//     MaintenancesController.editMaintenance
// );
// router.delete(
//     '/:carId/:maintenanceId',
//     MaintenancesController.deleteMaintenance
// );

export default router