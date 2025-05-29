import { Request, Response } from "express";
import { createPreference } from "../services/ModuloVentas/mercadopago-service";

export const PaymentController = {
  create: async (req: Request, res: Response) => {
    try {
      if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
        return res.status(400).json({ error: "El campo items es obligatorio y debe ser un array con al menos un producto." });
      }

      const items = req.body.items.map((item: any) => ({
        title: item.title || "Producto",
        quantity: Number(item.quantity) || 1,
        unit_price: Number(item.unit_price) || 1,
        currency_id: item.currency_id || "COP",
      }));

      const preferenceData = {
        items,
        payer: req.body.payer,
        back_urls: {
          success: "https://www.google.com",
          failure: "https://www.google.com",
          pending: "https://www.google.com"
        },
        auto_return: "approved",
      };

      console.log("Datos de la preferencia enviados a MercadoPago:", JSON.stringify(preferenceData, null, 2));

      // El service debe devolver el objeto de respuesta de MercadoPago
    const mpResponse = await createPreference(preferenceData);

      // Si el objeto tiene error, responde con error
      if (!mpResponse || !(mpResponse as any).id) {
        console.error("Error al crear la preferencia:", mpResponse);
        return res.status(500).json({ error: "No se pudo crear la preferencia.", details: mpResponse });
      }

      res.status(200).json({ preference: mpResponse });
    } catch (error: any) {
      console.error("Error al crear la preferencia:", error);
      res.status(500).json({ error: "Error al crear la preferencia: " + error.message });
    }
  },
};