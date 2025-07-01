import { Request, Response } from "express";
import { predecirVentasDesdeDBService } from "../services/ModuloIA/MetricasIA";

export const obtenerPrediccionVentas = async (req: Request, res: Response) => {
  const agrupacion = req.query.agrupacion as 'dia' | 'mes' | 'año' || 'dia';

  try {
    const resultado = await predecirVentasDesdeDBService(agrupacion);
    res.json(resultado);
  } catch (error) {
    console.error("Error en controlador de predicción:", error);
    res.status(500).json({ error: "Error interno al obtener predicción" });
  }
};
