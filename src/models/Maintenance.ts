import mongoose, { Document, Schema } from "mongoose";

const mantenimientoStatus = {
    PENDIENTE: 'pendiente',
    EN_PROGRESO: 'enProgreso',
    COMPLETADO: 'completado'
} as const

export type MantenimientoStatus = typeof mantenimientoStatus[keyof typeof mantenimientoStatus]

export interface IMantenimiento extends Document {
    vehiculo_id: number,
    mantenimientos: {
        _id: mongoose.Types.ObjectId,
        tipo: string,
        costo: number,
        kilometraje: number,
        status: MantenimientoStatus,
        notas: string
    }[]
}

const MantenimientoSchema : Schema = new Schema({
    vehiculo_id: {
        type: Number,
        required: true
    },
    mantenimientos: [
        {
            _id: {
                type: mongoose.Types.ObjectId,
                auto: true
            },
            tipo: {
                type: String,
                required: true
            },
            costo: {
                type: Number,
                required: true
            },
            kilometraje: {
                type: Number,
                required: true
            },
            status: {
                type: String,
                enum: Object.values(mantenimientoStatus),
                default: mantenimientoStatus.PENDIENTE
            },
            notas: {
                type: String,
                required: true
            }
        }
    ]
}, {timestamps: true})

const Mantenimiento = mongoose.model<IMantenimiento>('Mantenimiento', MantenimientoSchema)

export default Mantenimiento