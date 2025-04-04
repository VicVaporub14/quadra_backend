import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import dotenv from 'dotenv'
import carRoutes from "./routes/carRoutes";
import insuranceRoutes from "./routes/insuranceRoutes";
import reservationRoutes from "./routes/reservationsRoutes"

dotenv.config()

// connectDB()

const app = express();
app.use(express.json());

// Routes
app.use('/api/cars', carRoutes)
app.use('/api/insurances', insuranceRoutes)
app.use('/api/reservations', reservationRoutes)

export default app;