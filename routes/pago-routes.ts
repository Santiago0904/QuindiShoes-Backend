// routes/pagos.ts
import express from "express";
import { guardarFactura } from '../controllers/factura-controller';
import {obtenerDomicilios} from '../controllers/domicilios-controller';

const router = express.Router();
router.get("/facturas/domicilios", obtenerDomicilios);
router.post('/pagos/confirmacion', async (req, res) => {
  console.log("📩🛰️ LLEGÓ CONFIRMACIÓN DE EPAYCO");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  try {
    await guardarFactura(req);
    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error al guardar factura/reserva:", error);
    res.sendStatus(500);
  }
});

export default router;
