import { Router } from "express";
import { BranchesController } from "../controllers/BranchesController";
import handleInputErrors from "../middleware/validation";
import { body } from "express-validator";

const router = Router();

router.post('/', 
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('direccion')
        .notEmpty().withMessage('La direccion es obligatoria'),
    body('telefono')
        .isNumeric().notEmpty().withMessage('Telefono Invalido'),
    handleInputErrors,
    BranchesController.createNewBranch
)

router.get('/', 
    handleInputErrors,
    BranchesController.getAllBranches
)

export default router;