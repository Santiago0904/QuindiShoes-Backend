import { Router } from "express";
import { buscarProductosConFiltros, obtenerSugerencias } from "../controllers/busqueda-controller";

const router = Router();

router.post("/", buscarProductosConFiltros);
router.get("/", obtenerSugerencias);

export default router;
