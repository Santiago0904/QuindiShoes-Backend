import express from "express";
import { obtenerPrediccionVentas } from "../controllers/MetricasIA-controller";
import db from "../config/config-db";

const router = express.Router();
router.get("/prediccion", obtenerPrediccionVentas);
export default router;
