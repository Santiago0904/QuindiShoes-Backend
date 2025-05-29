import { Router } from "express";
import { guardarPuntuacion, obtenerTops } from "../controllers/Juego-controller";
import { verifyToken } from "../controllers/renovar-token-controller";

const router = Router();

router.post("/", verifyToken, guardarPuntuacion);

router.get("/", obtenerTops);

export default router;