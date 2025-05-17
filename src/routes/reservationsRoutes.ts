import { Router } from "express";
import { body, param } from "express-validator";
import ReservationsController from "../controllers/ReservationsController";
import handleInputErrors from "../middleware/validation";
import { reservationExists } from "../middleware/reservation";
import { validateReservation } from "../middleware/reservation";

const router = Router();

// Crear Reserva
router.post('/', 
    [
        // body('usuario_id')
        //     .isNumeric().withMessage('ID de usuario inválido'),
        body('vehiculo_id')
            .isNumeric().withMessage('ID de vehículo inválido'),
        body('fecha_inicio')
            .isISO8601().withMessage('Formato de fecha inválido (YYYY-MM-DD)'),
        body('fecha_fin')
            .isISO8601().withMessage('Formato de fecha inválido (YYYY-MM-DD)')
            .custom((value, { req }) => {
                if (new Date(value) <= new Date(req.body.fecha_inicio)) {
                    throw new Error('La fecha fin debe ser posterior a la fecha inicio');
                }
                return true;
            }),
        body('alquiler.monto')
            .isNumeric().withMessage('Monto debe ser numérico'),
        body('alquiler.metodo_pago')
            .notEmpty().withMessage('Método de pago es requerido'),
        handleInputErrors,
        validateReservation
    ],
    ReservationsController.createNewReservation
);

// Obtener todas las reservas
router.get('/', 
    ReservationsController.getAllReservations
);

// Obtener reservas por usuario
router.get('/usuario/:usuario_id', 
    [
        param('usuario_id')
            .isNumeric().withMessage('ID de usuario inválido').toInt(),
        handleInputErrors
    ],
    ReservationsController.getReservationsByUserId
);

// Middleware para rutas con ID de reserva
router.param('reservationId', reservationExists);

// Obtener reserva específica
router.get('/:reservationId', 
    [
        param('reservationId')
            .isMongoId().withMessage('ID de reserva inválido'),
        handleInputErrors
    ],
    ReservationsController.getReservationById
);

// Actualizar reserva
router.put('/:reservationId',
    [
        param('reservationId')
            .isMongoId().withMessage('ID de reserva inválido'),
        body('usuario_id')
            .optional()
            .isNumeric().withMessage('ID de usuario inválido'),
        body('vehiculo_id')
            .optional()
            .isNumeric().withMessage('ID de vehículo inválido'),
        body('fecha_inicio')
            .optional()
            .isISO8601(),
        body('fecha_fin')
            .optional()
            .isISO8601(),
        handleInputErrors,
        validateReservation // Solo valida si se envían IDs en el body
    ],
    ReservationsController.updateReservation
);

// Eliminar reserva
router.delete('/:reservationId',
    [
        param('reservationId')
            .isMongoId().withMessage('ID de reserva inválido'),
        handleInputErrors
    ],
    ReservationsController.deleteReservation
);

export default router;