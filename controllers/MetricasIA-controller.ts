import { Request, Response } from "express";
import { obtenerPrediccionVentas } from "../services/ModuloIA/MetricasIA"; // Asumiendo arquitectura con servicios

export const predecirVentasHandler = async (req: Request, res: Response) => {
  try {
    const ventas = req.body.ventas;
    const resultado = await obtenerPrediccionVentas(ventas);
    res.json(resultado);
  } catch (error) {
    console.error("Error al obtener predicción:", error);
    res.status(500).json({ error: "Error al predecir ventas" });
  }
};
