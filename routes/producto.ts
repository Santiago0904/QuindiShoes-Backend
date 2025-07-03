import express from "express";
import registrarProducto  from '../controllers/producto-controller';
import { obtenerProductos, eliminarProducto, obtenerTallas, obtenerColores, obtenerDetalleProducto, registrarColor } from "../controllers/producto-controller";
import  actualizarProducto, { actualizarReservaActiva }  from "../controllers/actualizar-producto-controller";
import { actualizarPersonalizacionActiva } from "../controllers/actualizar-producto-controller";
import { obtenerFacturas } from "../controllers/factura-controller";
import {renovarTokenMiddleware, verifyToken }from "../controllers/renovar-token-controller";
import { obtenerProductosFiltrados } from "../controllers/producto-controller";
import bodyParser from 'body-parser';
const router = express.Router();


router.post('/', renovarTokenMiddleware, registrarProducto);
router.get("/", verifyToken, renovarTokenMiddleware, obtenerProductos);
router.delete("/:id", renovarTokenMiddleware, eliminarProducto);
router.put("/:id", renovarTokenMiddleware, actualizarProducto);
router.put<{ id: string }>('/:id/reserva', renovarTokenMiddleware, actualizarReservaActiva);
router.put('/:id/personalizacion', renovarTokenMiddleware, actualizarPersonalizacionActiva);
router.get("/public", obtenerProductos);

router.get('/filtrados', obtenerProductosFiltrados);

router.get('/facturas', obtenerFacturas);






  

router.get("/tallas", obtenerTallas);
router.get("/colores", obtenerColores); 

router.post("/colores", registrarColor);

export default router;