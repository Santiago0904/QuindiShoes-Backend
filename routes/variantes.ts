import express from "express";
import { 
  obtenerVariantesPorProducto, 
  crearVariante, 
  actualizarVariante, 
  eliminarVariante 
} from "../controllers/variantes-controller";
import { renovarTokenMiddleware, verifyToken } from "../controllers/renovar-token-controller";

const router = express.Router();

router.get("/:id_producto", verifyToken, renovarTokenMiddleware, obtenerVariantesPorProducto);
router.post("/", verifyToken, renovarTokenMiddleware, crearVariante);
router.put("/:id_variante", verifyToken, renovarTokenMiddleware, actualizarVariante);
router.delete("/:id_variante", verifyToken, renovarTokenMiddleware, eliminarVariante);

export default router;