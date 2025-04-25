
import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { insuranceExists } from "../middleware/insurance";
import { InsurancesController } from "../controllers/InsurancesController";


const router = Router();

router.post('/', 
    body('tipo')
        .notEmpty().isString().withMessage('El tipo es requerido'),
    body('cobertura')
        .notEmpty().isString().withMessage('La cobertura es requerida'),
    body('precio')
        .notEmpty().isNumeric().withMessage('El precio es requerido'),
    body('descripcion')
        .notEmpty().isString().withMessage('La descripción es requerida'),
    handleInputErrors,
    InsurancesController.createInsurance
)
router.get('/', 
    InsurancesController.getAllInsurances
)

router.param('insuranceId', insuranceExists)

router.get('/:insuranceId',
    param('insuranceId').isNumeric().withMessage('Id no valido'),
    handleInputErrors,
    InsurancesController.getInsuranceById
)

router.put('/:insuranceId', 
    param('insuranceId').isNumeric().withMessage('Id no valido'),
    body('tipo')
        .notEmpty().isString().withMessage('El tipo es requerido'),
    body('cobertura')
        .notEmpty().isString().withMessage('La cobertura es requerida'),
    body('precio')
        .notEmpty().isNumeric().withMessage('El precio es requerido'),
    body('descripcion')
        .notEmpty().isString().withMessage('La descripción es requerida'),
    handleInputErrors,
    InsurancesController.updateInsurance
)
router.delete('/:insuranceId',
    param('insuranceId').isNumeric().withMessage('Id no valido'),
    handleInputErrors,
    InsurancesController.deleteInsurance
)


export default router;