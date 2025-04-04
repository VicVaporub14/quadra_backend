import { Request, Response } from "express"

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            
        } catch (error) {
            res.status(500).json('Error al crear la cuenta')
        }
    }
}