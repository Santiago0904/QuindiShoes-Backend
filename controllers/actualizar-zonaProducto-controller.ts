// controllers/actualizarProducto-controller.ts
import { Request, Response } from "express";
import ZonaProducto from "../Dto/ZonaProductosDto";
import PersonalizacionServices from "../services/ModuloPersonalizacion/PersonalizacionServices";

const actualizarMaterial = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const {
        nombre_zona
        
      } = req.body;
  
      const zonaProducto = new ZonaProducto(
        nombre_zona
      );
  
      await PersonalizacionServices.actualizarZonaProducto(zonaProducto, id);
  
      return res.status(200).json({ message: "Zona del producto actualizada correctamente" });
    } catch (error) {
      console.error("Error al actualizar la zona del producto:", error);
      return res.status(500).json({ error: "Error al actualizar la zona del producto" });
    }
  };
  

export default actualizarMaterial;
