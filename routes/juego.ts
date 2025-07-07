import { Router } from "express";
import { guardarPuntuacion, obtenerTops } from "../controllers/Juego-controller";
import { verifyToken } from "../controllers/renovar-token-controller";
import { obtenerEstadoDescuentoController } from "../controllers/usuario-controller";

const router = Router();

router.post("/", verifyToken, guardarPuntuacion);

router.get("/", obtenerTops);

router.get('/:id/descuento-estado', obtenerEstadoDescuentoController);

export default router;