
import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { body, param } from "express-validator";
import handleInputErrors from "../middleware/validation";
import { userExists } from "../middleware/users";

const router = Router();

router.post('/',
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('email')
        .notEmpty().withMessage('El correo electronico es obligatorio')
        .isEmail().withMessage('Correo Electronico no valido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({min: 8}).withMessage('El password debe de tener al menos 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Las Contraseñas no coinciden')
        }
        return true
    }),
    body('role')
        .optional()
        .isIn(['ADMIN', 'CUSTOMER']).withMessage('El rol debe ser Administrador o Cliente'),
    body('imagen')
        .optional(),
    body('confirmado')
        .optional(),
    handleInputErrors,
    UsersController.createAdminUser       
)

router.get('/', 
    handleInputErrors,
    UsersController.getAllUsers
)

router.param('userId', userExists)

router.get('/:userId',
    param('userId').isNumeric().withMessage('Id No Valido'),
    handleInputErrors,
    UsersController.getUserById
)

/* Falta autorizacion de actualizacion y eliminacion */
router.put('/:userId',
    param('userId').isNumeric().withMessage('Id No Valido'),
    handleInputErrors,
    UsersController.updateUser
)

router.delete('/:userId',
    param('userId').isNumeric().withMessage('Id No Valido'),
    handleInputErrors,
    UsersController.deleteUser
)


/* Cambio de imagen */
// router.put('/:id/imagen',
//     body('imagen')
//         .notEmpty().withMessage('La imagen es obligatoria')
//         .isString().withMessage('La imagen debe ser una cadena de texto'),
//     async (req: Request, res: Response) => {
//         const { id } = req.params;
//         const { imagen } = req.body;

//         try {
//             const updatedUser = await prisma.usuario.update({
//                 where: { id: parseInt(id) },
//                 data: { imagen },
//             });

//             res.status(200).json({ message: 'Imagen actualizada exitosamente', user: updatedUser });
//         } catch (error) {
//             res.status(500).json({ message: 'Error al actualizar la imagen', error });
//         }
//     }
// );

export default router