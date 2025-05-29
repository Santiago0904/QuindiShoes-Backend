import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UsuarioRepository from "../repositories/ModuloUsuarios/UsuarioRepository";
import  {enviarCorreo}  from "../services/ModuloUsuarios/CorreoService";

const recuperarContraseña = async (req: Request, res: Response) => {
  const { correo } = req.body;

  try {
 
    const usuario = await UsuarioRepository.EncontrarCorreo(correo);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

  
    const token = jwt.sign(
      { id: usuario.id },
      process.env.KEY_TOKEN!,
      { expiresIn: "15m" }
    );
    
    await enviarCorreo(correo, token);

    return res.status(200).json({ message: "Correo enviado con instrucciones" });

  } catch (error) {
    console.error("Error al recuperar contraseña:", error);
    return res.status(500).json({ error: "Error al enviar el correo" });
  }
};

export default recuperarContraseña;