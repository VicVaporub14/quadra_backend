import { Router } from "express";
import ReservationsController from "../controllers/ReservationsController";
import { body, param } from "express-validator";
import handleInputErrors from "../middleware/validation";


const router = Router()

router.post('/', 
    body('vehiculo_id')
        .notEmpty().withMessage('El vehiculo es obligatorio'),
    body('cliente_id')
        .notEmpty().withMessage('El cliete es obligatorio'),
    body('seguro_id')
        .notEmpty().withMessage('El seguro es obligatorio'),
    body('fecha_inicio')
        .notEmpty().withMessage('La fecha de inicio es obligatoria'),
    body('fecha_fin')
        .notEmpty().withMessage('La fecha fin es obligatoria'),
    body('estado')
        .notEmpty().withMessage('El estado es obligatorio'),
    body('alquiler')
        .notEmpty().withMessage('El alquiler es obligatorio'),
    ReservationsController.createNewReservation
)
router.get('/', 
    handleInputErrors,
    ReservationsController.getAllReservations
)

router.get('/:reservationId', 
    param('reservationId').isMongoId().withMessage('Id No valido'),
    handleInputErrors,
    ReservationsController.getReservationById
)

export default router;