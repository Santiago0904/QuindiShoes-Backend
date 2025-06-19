import db from '../config/config-db';
import { Request, Response } from "express";

export const obtenerReservas = async (_req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query(
      `SELECT * FROM reservas ORDER BY id_reserva DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).json({ error: "Error al obtener reservas" });
  }
};