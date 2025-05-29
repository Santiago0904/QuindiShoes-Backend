import express from "express";
import agregarCarrito from "../controllers/agregar-carrito-controller";

const router = express.Router();

router.get("/:id", agregarCarrito);

export default router;