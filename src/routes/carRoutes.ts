import { Router } from "express";
import CarController from "../controllers/CarController";
import { body, param } from "express-validator";
import handleInputErrors from "../middleware/validation";
import { carExist } from "../middleware/car";

const router = Router();

router.post('/', 
    body('marca')
        .notEmpty().isString().withMessage('La marca es obligatoria'),
    body('modelo')
        .notEmpty().isString().withMessage('El modelo es obligatorio'),
    body('color')
        .notEmpty().isString().withMessage('El color es obligatorio'),
    body('anio')
        .notEmpty().isNumeric().withMessage('El año es obligatorio'),
    body('transmision')
        .notEmpty().isString().withMessage('La transmision es obligatorio'),
    body('modelo')
        .notEmpty().isString().withMessage('El modelo es obligatorio'),
    body('tipo')
        .notEmpty().isString().withMessage('El tipo es obligatorio'),
    body('precio_por_dia')
        .notEmpty().isNumeric().withMessage('El precio es obligatorio'),
    body('seguroId')
        .notEmpty().isNumeric().withMessage('El seguro es obligatorio'),
    body('imagen')
        .notEmpty().isString().withMessage('La imagen es obligatorio'),
    body('estado')
        .notEmpty().isString().withMessage('El estado es obligatorio'),
    handleInputErrors,
    CarController.createCar
)
router.get('/', CarController.getAllCars)



router.param('carId', carExist)

router.get('/:carId',
    handleInputErrors,
    CarController.getCarById
)

router.put('/:carId',
    param('carId').isNumeric().withMessage('Id no valido'),
    body('marca')
        .notEmpty().isString().withMessage('La marca es obligatoria'),
    body('modelo')
        .notEmpty().isString().withMessage('El modelo es obligatorio'),
    body('color')
        .notEmpty().isString().withMessage('El color es obligatorio'),
    body('anio')
        .notEmpty().isNumeric().withMessage('El año es obligatorio'),
    body('transmision')
        .notEmpty().isString().withMessage('La transmision es obligatorio'),
    body('modelo')
        .notEmpty().isString().withMessage('El modelo es obligatorio'),
    body('tipo')
        .notEmpty().isString().withMessage('El tipo es obligatorio'),
    body('precio_por_dia')
        .notEmpty().isNumeric().withMessage('El precio es obligatorio'),
    body('seguroId')
        .notEmpty().isNumeric().withMessage('El seguro es obligatorio'),
    body('imagen')
        .notEmpty().isString().withMessage('La imagen es obligatorio'),
    body('estado')
        .notEmpty().isString().withMessage('El estado es obligatorio'),
    handleInputErrors,
    CarController.updateCar
)

router.delete('/:carId',
    param('carId').isNumeric().withMessage('Id no valido'),
    handleInputErrors,
    CarController.deleteCar
)

export default router;