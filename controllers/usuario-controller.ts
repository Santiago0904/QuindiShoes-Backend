import { Request, Response } from "express";
import UsuarioRepository from "../repositories/ModuloUsuarios/UsuarioRepository";
import UsuarioService from "../services/ModuloUsuarios/UserServices";

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

export const obtenerEstadoDescuentoController = async (req: Request, res: Response) => {
  const idUsuario = Number(req.params.id);

  try {
    const descuento_usado = await UsuarioService.obtenerEstadoDescuento(idUsuario);
    res.json({ descuento_usado });
  } catch (error) {
    console.error('Error al consultar estado del descuento:', error);
    res.status(500).json({ error: 'Error al obtener estado del descuento' });
  }
};
