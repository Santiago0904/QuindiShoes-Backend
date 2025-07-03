import express, { Request } from "express";
import addMaterial, { uploadMaterial } from "../controllers/material-controller";
import { obtenerMateriales, eliminarMateriales } from "../controllers/material-controller";
import actualizarMaterial from "../controllers/actualizar-material-controller";
import { renovarTokenMiddleware, verifyToken } from "../controllers/renovar-token-controller";
import db from '../config/config-db'; // Asegúrate de importar tu conexión
const router = express.Router();

// Extiende la interfaz Request para incluir 'db'
declare module "express-serve-static-core" {
  interface Request {
    db?: any;
  }
}

router.post('/', verifyToken, renovarTokenMiddleware, uploadMaterial.single('material_img'), addMaterial);
router.get("/", obtenerMateriales);
router.delete("/:id", renovarTokenMiddleware, eliminarMateriales);
router.put("/:id", renovarTokenMiddleware, actualizarMaterial);

// Nuevo endpoint para servir la imagen del material por id
router.get("/imagen/:id", async (req, res) => {
  try {
    const [rows]: any = await db.execute(
      "SELECT material_img FROM materiales WHERE id_material = ?",
      [req.params.id]
    );
    if (!rows.length) return res.status(404).send("No encontrada");
    res.set("Content-Type", "image/jpg"); // Cambia si usas otro formato
    res.send(rows[0].material_img);
  } catch (err) {
    res.status(500).send("Error al obtener la imagen");
  }
});

export default router;