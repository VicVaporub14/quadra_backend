import express from "express";
import cors from "cors";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import dotenv from 'dotenv'
import authRoutes from "./routes/authRoutes"
import carsRoutes from "./routes/carsRoutes";
import insurancesRoutes from "./routes/insurancesRoutes";
import usersRoutes from "./routes/usersRoutes"
import branchesRoutes from "./routes/branchesRoutes"
import reservationsRoutes from "./routes/reservationsRoutes"
import maintenancesRoutes from "./routes/maintenancesRoutes"

dotenv.config()

connectDB();

const app = express();
app.use(cors(corsConfig))
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/cars', carsRoutes)
app.use('/api/insurances', insurancesRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/branches', branchesRoutes)
app.use('/api/reservations', reservationsRoutes)
app.use('/api/maintenances', maintenancesRoutes)

export default app;