
import { Usuario } from '@prisma/client';
import jwt from 'jsonwebtoken';

type UserPayload = {
    id: Usuario['id']
}

export const generateJWT = (payload: UserPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '180d'
    })
    return token
}