import express from "express";
import addMaterial from "../controllers/material-controller";
import { obtenerMateriales, eliminarMateriales} from "../controllers/material-controller";
import actualizarMaterial from "../controllers/actualizar-material-controller";
import {renovarTokenMiddleware, verifyToken }from "../controllers/renovar-token-controller";
const router = express.Router();


router.post('/', renovarTokenMiddleware, addMaterial);
router.get("/", verifyToken, renovarTokenMiddleware, obtenerMateriales);
router.delete("/:id", renovarTokenMiddleware, eliminarMateriales);
router.put("/:id", renovarTokenMiddleware, actualizarMaterial);
export default router;