import express from "express";
import upload from "../middleware/Upload";
import { subirImagenProducto } from "../controllers/variantes-controller";
import { verifyToken, renovarTokenMiddleware } from "../controllers/renovar-token-controller";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  renovarTokenMiddleware,
  upload.single("imagen"),
  subirImagenProducto
);

export default router;
