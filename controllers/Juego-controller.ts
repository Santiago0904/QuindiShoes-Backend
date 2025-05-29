import { Request, Response } from "express";
import JuegoService from "../services/ModuloJuego/JuegoService";

// Guardar puntuación
export const guardarPuntuacion = async (req: Request, res: Response) => {
  const { usuarioId, puntuacion } = req.body;
  try {
    console.log("Guardando puntuación:", usuarioId, puntuacion);
    await JuegoService.guardarPuntuacion(usuarioId, puntuacion);
    res.status(200).json({ message: "Puntuación guardada" });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar la puntuación" });
  }
};

// Obtener top 10
export const obtenerTops = async (_req: Request, res: Response) => {
  try {
    console.log("Obteniendo top de jugadores");
    const tops = await JuegoService.obtenerTops();
    res.status(200).json(tops);
    console.log("Top de jugadores obtenido:", tops);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el top de jugadores" });
  }
};