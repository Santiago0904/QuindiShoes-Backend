import { Request, Response } from "express";
import PersonalizacionServices from "../services/ModuloPersonalizacion/PersonalizacionServices";

class PersonalizacionController {
// controllers/personalizacion-controller.ts
static async guardarModeloGLB(req: Request, res: Response) {
  try {
    const { id_usuario } = req.body;
    const archivo = req.file;

    if (!id_usuario || !archivo || !archivo.buffer) {
      return res.status(400).json({ message: "Falta ID de usuario o archivo." });
    }

    await PersonalizacionServices.guardarModeloGLB(Number(id_usuario), archivo.buffer);

    return res.status(200).json({ message: "Modelo 3D guardado correctamente." });
  } catch (error) {
    console.error("Error al guardar el modelo GLB:", error);
    return res.status(500).json({ message: "Error al guardar el modelo." });
  }
}

static async obtenerHistorialGLB(req: Request, res: Response) {
  try {
    const { id_usuario } = req.params;
    if (!id_usuario) {
      return res.status(400).json({ message: "ID de usuario no proporcionado." });
    }

    console.log("Obteniendo historial de modelos GLB para el usuario:", id_usuario);

    const historial = await PersonalizacionServices.obtenerHistorialGLB(Number(id_usuario));

    // Solo devuelve los IDs, ya que el GLB se carga por otra ruta
    const respuesta = historial.map((item: any) => ({
      id: item.id_personalizacionCalzado,
    }));

    return res.status(200).json(respuesta);
  } catch (error) {
    console.error("Error al obtener historial de modelos GLB:", error);
    return res.status(500).json({ message: "Error al obtener el historial." });
  }
}

// En tu controlador
static async obtenerModeloPorId(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const modelo = await PersonalizacionServices.obtenerModeloPorId(Number(id));
    if (!modelo) {
      return res.status(404).json({ message: "Modelo no encontrado." });
    }

    res.setHeader("Content-Type", "model/gltf-binary");
    return res.send(modelo.personalizacion_img);
  } catch (error) {
    console.error("Error al obtener modelo por ID:", error);
    return res.status(500).json({ message: "Error al obtener el modelo." });
  }
}




}

export default PersonalizacionController;
