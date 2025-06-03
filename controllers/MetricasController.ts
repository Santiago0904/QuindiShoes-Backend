// controllers/MetricasController.ts
import { Request, Response } from 'express';
import { MetricsService } from '../services/ModuloMetrica/MetricasService';

const ventasPorRango = async (req: Request, res: Response) => {
  try {
    const agrupacion = req.query.agrupacion as 'dia' | 'semana' | 'mes' | 'anio' || 'mes';
    const data = await MetricsService.getVentasPorRango(agrupacion);
    res.json(data);
  } catch (error) {
    console.error('Error al obtener ventas por rango:', error);
    res.status(500).json({ error: 'Error al obtener métricas de ventas' });
  }
};

export default ventasPorRango; // ✅ Exportas solo la función
