import express from "express";
import MetricasController from '../controllers/MetricasController';

const router = express.Router();

router.get('/ventas', MetricasController.ventasPorRango);
router.get('/top-productos', MetricasController.topProductos);
router.get('/productos-inactivos', MetricasController.productosInactivos);
export default router;
