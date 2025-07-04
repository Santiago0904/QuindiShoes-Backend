// src/routes/register-routes.ts
import express from "express";
import registerController from "../controllers/register-controller";
import { validatorParams, validator } from "../middleware/Register-validator";

const router = express.Router();

// ✅ Ruta para registrar un nuevo usuario
router.post("/", validatorParams, validator, registerController.register);

// ✅ Ruta para confirmar el correo con el token
router.get("/confirmar", registerController.confirmarCorreo);

// ✅ Ruta para verificar y registrar el usuario usando el token
router.get("/verificar-estado", registerController.verificarEstadoCorreo);

// ✅ Ruta para eliminar un empleado por ID
router.delete("/empleado/:id", registerController.eliminarEmpleado);

// (Opcional: podrías agregar más rutas si se necesitan en el futuro)

export default router;
