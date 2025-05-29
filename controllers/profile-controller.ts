import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UsuarioService from "../services/ModuloUsuarios/UserServices";

const obtenerInfoUsuario = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No se proporcionó token válido" });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.KEY_TOKEN!);
    const idUsuario = decoded.data.id;

    const usuario = await UsuarioService.obtenerInfoUsuario(idUsuario);
    
    // Aseguramos que se retorna solo una vez
    return res.status(200).json(usuario);

  } catch (error) {
    console.error("Error al obtener información del usuario:", error);

    // Nos aseguramos de usar `return` aquí también
    return res.status(400).json({ error: "Error al obtener información del usuario" });
  }
};

export default obtenerInfoUsuario;
