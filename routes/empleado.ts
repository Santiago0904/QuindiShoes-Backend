import express from "express";
import actualizarEmpleado from '../controllers/actualizar-empleado-controller';
import { obtenerEmpleados, eliminarEmpleado }  from '../controllers/register-controller';
import {renovarTokenMiddleware, verifyToken }from "../controllers/renovar-token-controller";
const router = express.Router();


router.get('/', verifyToken,renovarTokenMiddleware,obtenerEmpleados);
router.delete('/:id', renovarTokenMiddleware,eliminarEmpleado);
router.put("/:id", renovarTokenMiddleware, actualizarEmpleado);



export default router;