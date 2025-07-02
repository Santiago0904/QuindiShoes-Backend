// src/controllers/FacturaController.ts
import { Request, Response } from "express";
import FacturaService from "../services/ModuloVentas/FacturaService";

 export const obtenerDomicilios= async(req: Request, res: Response) =>{
    try {
      const facturas = await FacturaService.obtenerFacturasDomicilio();
      res.json(facturas);
    } catch (error) {
      console.error("Error al obtener domicilios:", error);
      res.status(500).json({ message: "Error al obtener los domicilios" });
    }
  }
