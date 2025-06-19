import { Request, Response } from 'express';
import ResenaProductoService from '../services/ModuloProductos/ResenaProductoService';

export const agregarResena = async (req: Request, res: Response) => {
  try {
    const { id_producto, id_usuario, resena, puntuacion } = req.body;
    if (!id_producto || !id_usuario || !resena) {
      return res.status(400).json({ mensaje: 'Faltan datos para agregar la reseña' });
    }
    await ResenaProductoService.agregarResena({ id_producto, id_usuario, resena, puntuacion });
    res.status(200).json({ mensaje: 'Reseña agregada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar reseña' });
  }
};

export const obtenerResenasPorProducto = async (req: Request, res: Response) => {
  try {
    const { id_producto } = req.params;
    const resenas = await ResenaProductoService.obtenerResenasPorProducto(Number(id_producto));
    res.status(200).json(resenas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reseñas' });
  }
};

export const eliminarResena = async (req: Request, res: Response) => {
  try {
    const { id_resena, id_usuario } = req.body;
    if (!id_resena || !id_usuario) {
      return res.status(400).json({ mensaje: 'Faltan datos para eliminar la reseña' });
    }
    await ResenaProductoService.eliminarResena(id_resena, id_usuario);
    res.status(200).json({ mensaje: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar reseña' });
  }
};

export const actualizarResena = async (req: Request, res: Response) => {
  try {
    const { id_resena, id_usuario, resena, puntuacion } = req.body;
    if (!id_resena || !id_usuario || !resena || puntuacion == null) {
      return res.status(400).json({ mensaje: 'Faltan datos para actualizar la reseña' });
    }
    await ResenaProductoService.actualizarResena({ id_resena, id_usuario, resena, puntuacion });
    res.status(200).json({ mensaje: 'Reseña actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar reseña' });
  }
};