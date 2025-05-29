// routes/pagos.ts
import express from "express";
import { guardarFactura } from '../controllers/factura-controller';

const router = express.Router();

router.post('/pagos/confirmacion', express.urlencoded({ extended: true }), async (req, res) => {
  try {
    console.log("📩 Confirmación recibida:");
    console.log(req.body);

    await guardarFactura(req); // Ya no pasa `res`

    res.sendStatus(200); // ✅ Solo aquí respondemos
  } catch (error) {
    console.error("❌ Error al procesar la confirmación:", error);
    res.sendStatus(500); // ❌ Solo responde si hubo error
  }
});

export default router;
