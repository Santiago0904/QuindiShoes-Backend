import express from "express";
import cambiarContrasena from "../controllers/cambiar-contraseña-controller";
import {renovarTokenMiddleware, verifyToken }from "../controllers/renovar-token-controller";

const router = express.Router();


router.post("/", verifyToken, renovarTokenMiddleware,cambiarContrasena);

export default router;


