import express from "express";
import ventasPorRango from '../controllers/MetricasController';

const router = express.Router();

router.get('/ventas', ventasPorRango);

export default router;
