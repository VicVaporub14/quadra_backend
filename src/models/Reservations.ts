import mongoose, { Document, Schema } from "mongoose";

export interface IReservas extends Document {
    cliente_id: number,
    vehiculo_id: number,
    seguro_id: number,
    fecha_inicio: Date,
    fecha_fin: Date,
    estado: string,
    alquiler: Object
}

const ReservasSchema : Schema = new Schema({
    cliente_id: {
        type: Number,
        required: true
    },
    vehiculo_id: { 
        type: Number, 
        required: true
    },
    seguro_id: {
        type: Number,
        required: true
    },
    fecha_inicio: {
        type: Date,
        required: true
    },
    fecha_fin: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    alquiler: {
        monto: {
            type: Number,
            required: true
        },
        metodo_pago: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        }
    }
}, {timestamps: true})

const Reservas = mongoose.model<IReservas>('reservas', ReservasSchema)
export default Reservas