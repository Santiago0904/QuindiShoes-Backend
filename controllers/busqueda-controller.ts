import { Request, Response } from "express";
import BusquedaServices from "../services/ModuloProductos/BusquedaServices";

const buscarProductosConFiltros = async (req: Request, res: Response) => {
  try {
    const filtros = req.body;
    const productos = await BusquedaServices.buscarProductosConFiltros(filtros);
    return res.status(200).json(productos);
  } catch (error) {
    console.error("Error en la búsqueda de productos:", error);
    return res.status(500).json({ error: "Error en la búsqueda" });
  }
};

const obtenerSugerencias = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const sugerencias = await BusquedaServices.obtenerSugerencias(query);
    return res.status(200).json(sugerencias);
  } catch (error) {
    console.error("Error en sugerencias:", error);
    return res.status(500).json({ error: "Error en sugerencias" });
  }
};

export { buscarProductosConFiltros, obtenerSugerencias };
