import express from "express";
import enviarProductosAI from "../controllers/enviarProductos-ai-controller";

const router = express.Router();

// Se protege la ruta con los middlewares de verificación de token, si fuera necesario
router.post("/", enviarProductosAI);

export default router;