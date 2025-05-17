import mongoose, { Document, Schema } from "mongoose";

export interface IReservas extends Document {
    usuario_id: number; // ID del usuario en PostgreSQL
    nombre: string,
    telefono: string,
    email: string,
    vehiculo_id: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    estado: string;
    alquiler: {
        monto: number;
        metodo_pago: string;
        estado: string;
    };
}

const ReservasSchema: Schema = new Schema({
    usuario_id: { 
        type: Number
    },
    // Cambios temporales
    nombre: {
        type: String,
        required: [true, 'El Nombre es obligatorio'] 
    },
    telefono: {
        type: String,
        required: [true, 'El Nombre es obligatorio'] 
    },
    email: {
        type: String,
        required: [true, 'El Nombre es obligatorio'] 
    },

    vehiculo_id: { 
        type: Number, 
        required: [true, 'El ID del vehículo es obligatorio'] 
    },
    fecha_inicio: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    fecha_fin: {
        type: Date,
        required: [true, 'La fecha de fin es obligatoria']
    },
    estado: {
        type: String,
        default: 'Vehiculo En Proceso de Entrega'
    },
    alquiler: {
        monto: {
            type: Number,
            required: [true, 'El monto del alquiler es obligatorio']
        },
        metodo_pago: {
            type: String,
            required: [true, 'El método de pago es obligatorio']
        },
        estado: {
            type: String,
            default: 'No Pagado'
        }
    }
}, { timestamps: true });

const Reservas = mongoose.model<IReservas>('reservas', ReservasSchema);
export default Reservas;