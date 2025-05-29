import { Router } from "express";
import { obtenerDetalleProducto } from "../controllers/producto-controller";

const router = Router();

router.get("/:id", obtenerDetalleProducto);

export default router;