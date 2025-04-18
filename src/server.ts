import express from "express";
import cors from "cors";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import dotenv from 'dotenv'
import authRoutes from "./routes/authRoutes"
import carRoutes from "./routes/carRoutes";
import insuranceRoutes from "./routes/insuranceRoutes";
import userRoutes from "./routes/usersRoutes"
import branchRoutes from "./routes/branchesRoutes"
import reservationRoutes from "./routes/reservationsRoutes"
import maintenanceRoutes from "./routes/maintenanceRoutes"

dotenv.config()

connectDB();

const app = express();
app.use(cors(corsConfig))
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/cars', carRoutes)
app.use('/api/insurances', insuranceRoutes)
app.use('/api/users', userRoutes)
app.use('/api/branches', branchRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/maintenances', maintenanceRoutes)

export default app;