import { Request, Response } from 'express';
import ZonaProductos from '../Dto/ZonaProductosDto';
import PersonalizacionServices from '../services/ModuloPersonalizacion/PersonalizacionServices';


  let addZona = async (req: Request, res: Response) => {
    try {
      const { nombreZona } = req.body;

      if (!nombreZona) {
        return res.status(400).json({ error: 'El nombre la zona es requerido' });
      }

      const zona_register = await PersonalizacionServices.addZonaProducto(new ZonaProductos(nombreZona));

      return res.status(201).json({ message: 'Zona agregada exitosamente', zona_register });
    } catch (error) {
      console.error('Error al agregar zona del producto:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  export const obtenerZonaProducto = async (req: Request, res: Response) => {
    try {
      const zonaProducto = await PersonalizacionServices.obtenerZonaProducto();
      res.json(zonaProducto);
    } catch (error) {
      console.error("Error al obtener zona del producto:", error);
      res.status(500).json({ error: "Error al obtener zona del producto" });
    }
  };
  
  export const eliminarZonaProducto = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await PersonalizacionServices.deleteZonaProducto(Number(id));
      res.status(200).json({ message: "Zona dle producto eliminada con éxito" });
    } catch (error) {
      console.error("Error al eliminar la zona del producto:", error);
      res.status(500).json({ error: "Error al eliminar la zona del producto" });
    }
  };


export default addZona;