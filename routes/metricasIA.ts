import express from "express";
import { predecirVentasHandler } from "../controllers/MetricasIA-controller";

const router = express.Router();
router.post("/metricas/prediccion", predecirVentasHandler);
export default router;
