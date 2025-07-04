// src/routes/pagos-routes.ts
import express from "express";
import { confirmarPago } from "../controllers/pagos-controlles";

const router = express.Router();

router.post("/confirmacion", confirmarPago); // Aquí escucha el POST que envía ePayco

export default router;
