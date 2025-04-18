import mongoose, { Document, Schema } from "mongoose";

export interface IReservas extends Document {
    nombre: string,
    email: string,
    telefono: string,
    vehiculo_id: number,
    fecha_inicio: Date,
    fecha_fin: Date,
    estado: string,
    alquiler: Object
}

const ReservasSchema : Schema = new Schema({
    nombre: { 
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    vehiculo_id: { 
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
        required: true,
        default: 'Vehiculo En Proceso de Entrega'
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
            required: true,
            default: 'no pagado'
        }
    }
}, {timestamps: true})

const Reservas = mongoose.model<IReservas>('reservas', ReservasSchema)
export default Reservas