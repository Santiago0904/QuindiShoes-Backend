import { Request, Response } from 'express';
import ResenaService from '../services/ModuloReseñas/ReseñaService';
import ResenaDto from '../Dto/resenaDto';

class ResenaController {
  static async agregarResena(req: Request, res: Response) {
    try {
      const { resena, fecha_resena, id_usuario } = req.body;
      if (!resena || !fecha_resena || !id_usuario || isNaN(Number(id_usuario))) {
        return res.status(400).json({ mensaje: 'Faltan datos para agregar la resena' });
      }
      await ResenaService.agregarResena({ resena, fecha_resena, id_usuario: Number(id_usuario) });
      res.status(200).json({ mensaje: 'Resena agregada correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error del servidor al agregar resena' });
    }
  }

  static async editarResena(req: Request, res: Response) {
    try {
      const { resena, fecha_resena, id_usuario } = req.body;
      if (!resena || !fecha_resena || !id_usuario || isNaN(Number(id_usuario))) {
        return res.status(400).json({ mensaje: 'Faltan datos para editar la resena' });
      }
      await ResenaService.editarResena({ resena, fecha_resena, id_usuario: Number(id_usuario) });
      res.status(200).json({ mensaje: 'Resena editada correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error del servidor al editar resena' });
    }
  }

  static async eliminarResena(req: Request, res: Response) {
    try {
      const { id_usuario } = req.body;
      if (!id_usuario || isNaN(Number(id_usuario))) {
        return res.status(400).json({ mensaje: 'Falta el id_usuario' });
      }
      await ResenaService.eliminarResena(Number(id_usuario));
      res.status(200).json({ mensaje: 'Resena eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error del servidor al eliminar resena' });
    }
  }

  static async obtenerTodasLasResenas(req: Request, res: Response) {
    try {
      const resenas = await ResenaService.obtenerTodasLasResenas();
      res.status(200).json(resenas);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener las reseñas' });
    }
  }
}

export default ResenaController;
