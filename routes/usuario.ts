import express from "express";
import { obtenerHistorialCompras } from "../controllers/historial-compras-controller";
import { obtenerUsuarioPorId } from "../controllers/usuario-controller";

const router = express.Router();

router.get("/:id", obtenerUsuarioPorId);
router.get("/:id_usuario/historial-compras", obtenerHistorialCompras);


export default router;