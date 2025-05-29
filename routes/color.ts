import express from "express";
import addColor from "../controllers/color-controller";
import { obtenerColores, eliminarColores} from "../controllers/color-controller";
import actualizarColor from "../controllers/actualizar-color-controller";
import {renovarTokenMiddleware, verifyToken }from "../controllers/renovar-token-controller";
const router = express.Router();


router.post('/', renovarTokenMiddleware, addColor);
router.get("/", verifyToken, renovarTokenMiddleware, obtenerColores);
router.delete("/:id", renovarTokenMiddleware, eliminarColores);
router.put("/:id", renovarTokenMiddleware, actualizarColor);
export default router;