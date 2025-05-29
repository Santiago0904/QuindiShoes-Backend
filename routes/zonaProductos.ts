import express from "express";
import addZona from "../controllers/zonaProducto-controller";
import { obtenerZonaProducto, eliminarZonaProducto} from "../controllers/zonaProducto-controller";
import actualizarZonaProducto from "../controllers/actualizar-zonaProducto-controller";
import {renovarTokenMiddleware, verifyToken }from "../controllers/renovar-token-controller";
const router = express.Router();


router.post('/', renovarTokenMiddleware, addZona);
router.get("/", verifyToken, renovarTokenMiddleware, obtenerZonaProducto);
router.delete("/:id", renovarTokenMiddleware, eliminarZonaProducto);
router.put("/:id", renovarTokenMiddleware, actualizarZonaProducto);
export default router;