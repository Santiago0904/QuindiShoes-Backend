import express from "express";
import { obtenerRecomendados } from "../controllers/recomendados-controller";
const router = express.Router();

router.get("/:id_usuario", obtenerRecomendados);

export default router;