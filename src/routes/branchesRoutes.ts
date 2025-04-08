import { Router } from "express";
import { body, param } from "express-validator";
import { branchExist } from "../middleware/branches";
import handleInputErrors from "../middleware/validation";
import { BranchesController } from "../controllers/BranchesController";

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

router.param('branchId', branchExist)

router.get('/:branchId',
    param('branchId').isNumeric().withMessage('Id no valido'),
    handleInputErrors,
    BranchesController.getBranchById
)

router.put('/:branchId',
    param('branchId').isNumeric().withMessage('Id no valido'),
    handleInputErrors,
    BranchesController.updateBranch
)

router.delete('/:branchId',
    param('branchId').isNumeric().withMessage('Id No Valido'),
    handleInputErrors,
    BranchesController.deleteBranch
)

export default router;