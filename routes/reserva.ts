import express from "express";
import { obtenerReservas } from "../controllers/reserva-controller";
const router = express.Router();

router.get("/", obtenerReservas);

export default router;