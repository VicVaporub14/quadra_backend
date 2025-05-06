import type { Request, Response } from "express"
import Reservas from "../models/Reservations"
import { prisma } from "../lib/prisma";

class ReservationsController {

    static async createNewReservation(req: Request, res: Response){
        try {
            const { usuario_id, vehiculo_id, ...reservaData } = req.body;
            
            // Validar existencia del usuario y vehículo
            const [usuarioExistente, vehiculoExistente] = await Promise.all([
                prisma.usuario.findUnique({ where: { id: usuario_id } }),
                prisma.vehiculo.findUnique({ 
                    where: { id: vehiculo_id },
                    include: { seguro: true } 
                })
            ]);

            if (!usuarioExistente) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }

            if (!vehiculoExistente) {
                res.status(404).json({ error: 'Vehículo no encontrado' });
                return;
            }

            const nuevaReserva = new Reservas({
                usuario_id,
                vehiculo_id,
                ...reservaData
            });

            await nuevaReserva.save();
            
            res.status(201).json({
                message: 'Reserva creada correctamente'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ 
                error: 'Error al crear reserva',
                detalles: error instanceof Error ? error.message : 'Error desconocido'
            });
        }

    }

    static async getAllReservations(req: Request, res: Response) {
        try {
            // Obtener todas las reservaciones desde MongoDB
            const reservations = await Reservas.find({}, { 
                alquiler: 0,
                createdAt: 0,
                updatedAt: 0
            });

            // Obtener información de los usuarios desde PostgreSQL
            const reservationsWithUserAndCarDetails = await Promise.all(
                reservations.map(async (reservation) => {
                    const usuario = await prisma.usuario.findUnique({
                        where: { id: reservation.usuario_id },
                        select: { nombre: true },
                    });

                    const vehiculo = await prisma.vehiculo.findUnique({
                        where: { id: reservation.vehiculo_id },
                        select: { modelo: true}
                    })

                    return {
                        ...reservation.toObject(), // Convertir la reservación de MongoDB a un objeto plano
                        usuario: usuario?.nombre || null, // Agregar solo el nombre del usuario
                        vehiculo: vehiculo?.modelo || null, // Agregar solo el modelo del vehículo
                    };
                })
            );

            res.json(reservationsWithUserAndCarDetails);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al obtener las reservaciones' });
        }
    }

    static async getReservationsByUserId(req: Request, res: Response) {
        try {
            const { usuario_id } = req.params;
            
            // Validar existencia del usuario
            const usuario = await prisma.usuario.findUnique({
                where: { id: Number(usuario_id) }
            });

            if (!usuario) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }

            const reservas = await Reservas.find({ usuario_id: Number(usuario_id) });
            
            // Obtener detalles de vehículos
            const reservasConDetalles = await Promise.all(
                reservas.map(async (reserva) => {
                    const vehiculo = await prisma.vehiculo.findUnique({
                        where: { id: reserva.vehiculo_id },
                        include: { seguro: true }
                    });
                    return {
                        ...reserva.toObject(),
                        vehiculo // Incluir detalles del vehículo o null si no existe
                    };
                })
            );

            res.json(reservasConDetalles);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener reservas' });
        }
    }

static async getReservationById(req: Request, res: Response) {
    try {
        // El middleware reservationExists ya pobló req.reservation
        const reserva = req.reservation;

        // Obtener datos del usuario y vehículo desde PostgreSQL
        const [usuario, vehiculo] = await Promise.all([
            prisma.usuario.findUnique({
                where: { id: reserva.usuario_id },
                select: {
                    nombre: true,
                    email: true,
                    telefono: true
                }
            }),
            prisma.vehiculo.findUnique({
                where: { id: reserva.vehiculo_id },
                select: {
                    marca: true,
                    modelo: true,
                    anio: true,
                    color: true,
                    transmision: true,
                    tipo: true,
                    puertas: true,
                    asientos: true,
                    clima: true,
                    precio_por_dia: true,
                    seguro: true
                }
            })
        ]);

        // Validar que existan los datos relacionados
        if (!usuario || !vehiculo) {
            res.status(404).json({
                error: "Datos relacionados no encontrados (usuario o vehículo)"
            });
            return;
        }

        // Combinar datos
        const reservaConDetalles = {
            ...reserva.toObject(),
            usuario,
            vehiculo
        };

        res.json(reservaConDetalles);

    } catch (error) {
        console.error("Error en getReservationById:", error);
        res.status(500).json({ 
            error: "Error al obtener la reserva", // Mensaje específico
            detalles: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

    static async updateReservation(req: Request, res: Response) {
        try {
            const { usuario_id, vehiculo_id, ...updateData } = req.body;
            
            // Validaciones
            if (usuario_id) {
                const usuario = await prisma.usuario.findUnique({
                    where: { id: usuario_id }
                });
                if (!usuario) 
                    res.status(404).json({ error: 'Usuario no existe' });
            }

            if (vehiculo_id) {
                const vehiculo = await prisma.vehiculo.findUnique({
                    where: { id: vehiculo_id }
                });
                if (!vehiculo)  
                    res.status(404).json({ error: 'Vehículo no existe' });
            }

            const reservaActualizada = await Reservas.findByIdAndUpdate(
                req.reservation._id,
                { usuario_id, vehiculo_id, ...updateData },
                { new: true }
            );

            res.json({
                message: 'Reserva actualizada'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar reserva' });
        }
    }

    static async deleteReservation(req: Request, res: Response) {
        try {
            await req.reservation.deleteOne()
            res.send('Reservacion eliminada correctamente')
        } catch (error) {
            console.log(error)
            // res.status(500).json({error: 'Hubo un error al eliminar la reserva'})
        }
    }
    
}


export default ReservationsController;