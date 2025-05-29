import { Request, Response } from "express";
import UsuarioRepository from "../repositories/ModuloUsuarios/UsuarioRepository";

export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ mensaje: "ID inválido" });
    const usuario = await UsuarioRepository.ObtenerUsuarioPorId(id);
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};