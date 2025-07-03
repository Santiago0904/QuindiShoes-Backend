import express from "express";
import multer from "multer";
import PersonalizacionController from "../controllers/personalizacion-controller";
const upload = multer();
const router = express.Router();

// routes/personalizacion.ts
router.post(
  "/guardar-modelo",
  upload.single("modelo"),
  PersonalizacionController.guardarModeloGLB
);

router.get(
  "/historialGLB/:id_usuario",
  PersonalizacionController.obtenerHistorialGLB
);

router.get("/modelo/:id", PersonalizacionController.obtenerModeloPorId);
router.get("/modelos", PersonalizacionController.obtenerModelos);

export default router;
