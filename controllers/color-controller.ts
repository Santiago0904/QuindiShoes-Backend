import { Request, Response } from 'express';
import Colores from '../Dto/ColoresDto';
import PersonalizacionServices from '../services/ModuloPersonalizacion/PersonalizacionServices';


  const addColor = async (req: Request, res: Response) => {
    try {
      const { nombreColor, codigoHax } = req.body;

      if (!nombreColor || !codigoHax) {
        return res.status(400).json({ error: 'El nombre del color y el código Hax son requeridos' });
      }

      const color_register = await PersonalizacionServices.addColores(new Colores(nombreColor, codigoHax));

      return res.status(201).json({ message: 'Color agregado exitosamente', color_register });
    } catch (error) {
      console.error('Error al agregar material:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  export const obtenerColores = async (req: Request, res: Response) => {
    try {
      const colores = await PersonalizacionServices.obtenerColores();
      res.json(colores);
    } catch (error) {
      console.error("Error al obtener colores:", error);
      res.status(500).json({ error: "Error al obtener colores" });
    }
  };
  
  export const eliminarColores = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await PersonalizacionServices.deleteColores(Number(id));
      res.status(200).json({ message: "Color eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar color:", error);
      res.status(500).json({ error: "Error al eliminar color" });
    }
  };


export default addColor;