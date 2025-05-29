import { Request, Response } from "express";
import { createPreference } from "../services/ModuloVentas/mercadopago-service";

export const createPreferenceController = async (req: Request, res: Response) => {
  try {
    const preferenceId = await createPreference(req.body);
    res.status(200).json({ preferenceId });
  } catch (error: any) {
    console.error("Error en createPreferenceController:", error);
    res.status(500).json({ error: error.message });
  }
};