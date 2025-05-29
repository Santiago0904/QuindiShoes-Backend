// controllers/actualizarProducto-controller.ts
import { Request, Response } from "express";
import Materiales from "../Dto/MaterialesDto";
import PersonalizacionServices from "../services/ModuloPersonalizacion/PersonalizacionServices";

const actualizarMaterial = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const {
        nombre_material
        
      } = req.body;
  
      const material = new Materiales(
        nombre_material
      );
  
      await PersonalizacionServices.actualizarMaterial(material, id);
  
      return res.status(200).json({ message: "Material actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar material:", error);
      return res.status(500).json({ error: "Error al actualizar material" });
    }
  };
  

export default actualizarMaterial;
