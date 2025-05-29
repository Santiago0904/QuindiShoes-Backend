import express from "express";
import { obtenerUsuarioPorId } from "../controllers/usuario-controller";
const router = express.Router();

router.get("/:id", obtenerUsuarioPorId);

export default router;