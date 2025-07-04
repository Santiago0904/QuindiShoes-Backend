// src/controllers/pagos-controller.ts
import { Request, Response } from "express";

export const confirmarPago = async (req: Request, res: Response) => {
  try {
    console.log("✅ Confirmación de pago recibida:", req.body);

    // Puedes verificar la firma, guardar la transacción, etc. aquí

    res.sendStatus(200); // 🔴 MUY IMPORTANTE: ePayco necesita un 200 OK para completar el pago
  } catch (error) {
    console.error("❌ Error en confirmación de pago:", error);
    res.sendStatus(500);
  }
};
