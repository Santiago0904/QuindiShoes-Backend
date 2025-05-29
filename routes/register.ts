import express from "express";
import registerController from "../controllers/register-controller"; // Importar el controlador completo
import { validatorParams, validator } from "../middleware/Register-validator"; // Middleware para validar datos

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/', validatorParams, validator, registerController.register);

// Ruta para confirmar el correo usando el token
router.get('/confirmar', registerController.confirmarCorreo);

// Ruta para eliminar un empleado

export default router;
