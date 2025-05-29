// controllers/actualizarProducto-controller.ts
import { Request, Response } from "express";
import Colores from "../Dto/ColoresDto";
import PersonalizacionServices from "../services/ModuloPersonalizacion/PersonalizacionServices";

const actualizarColor = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const {
        nombreColor,
        codigoHax
        
      } = req.body;
  
      const color = new Colores(
        nombreColor,
        codigoHax
      );
  
      await PersonalizacionServices.actualizarColor(color, id);
  
      return res.status(200).json({ message: "Color actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar color:", error);
      return res.status(500).json({ error: "Error al actualizar color" });
    }
  };
  

export default actualizarColor;
