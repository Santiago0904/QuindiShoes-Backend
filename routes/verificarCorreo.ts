import express from "express";
import { verificarEstadoCorreo } from "../controllers/register-controller"; // Importamos la función del controlador

const router = express.Router();

// Ruta para verificar el correo
router.get('/verificar-correo', verificarEstadoCorreo); // Llamamos a la función que verifica el correo

export default router;
