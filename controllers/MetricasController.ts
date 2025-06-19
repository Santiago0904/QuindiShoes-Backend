// controllers/MetricasController.ts
import { Request, Response } from 'express';
import { MetricsService } from '../services/ModuloMetrica/MetricasService';

const ventasPorRango = async (req: Request, res: Response) => {
  try {
    const agrupacion = req.query.agrupacion as 'dia' | 'semana' | 'mes' | 'año' || 'mes';
    const data = await MetricsService.getVentasPorRango(agrupacion);
    res.json(data);
  } catch (error) {
    console.error('Error al obtener ventas por rango:', error);
    res.status(500).json({ error: 'Error al obtener métricas de ventas' });
  }
};

const topProductos = async (req: Request, res: Response) => {
  const { tipo, limite } = req.query;

  try {
    const top = await MetricsService.obtenerTopProductos(
      tipo as 'mas' | 'menos',
      Number(limite) || 5
    );
    res.json(top);
  } catch (error) {
    console.error('Error al obtener top productos:', error);
    res.status(500).json({ error: 'Error al obtener top productos' });
  }
};
const productosInactivos = async (req: Request, res: Response) => {
  try {
    const data = await MetricsService.obtenerProductosInactivos();
    res.json(data);
  } catch (error) {
    console.error('Error al obtener productos inactivos:', error);
    res.status(500).json({ error: 'Error al obtener productos inactivos' });
  }
};

export default {
  ventasPorRango,
  topProductos,
  productosInactivos
};
