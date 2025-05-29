import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UsuarioService from "../services/ModuloUsuarios/UserServices";

const cambiarContrasena = async (req: Request, res: Response) => {
    console.log("Entrando a cambiar contraseña");
    const authHeader = req.headers.authorization;
    console.log("Header de autorización:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No se proporcionó token válido" });
    }
  
    const token = authHeader.split(" ")[1];
    const { contraseñaActual, nuevaContraseña } = req.body;
    console.log("Body recibido:", req.body);

    try {
      const decoded: any = jwt.verify(token, process.env.KEY_TOKEN!);
        console.log("Token decodificado:", decoded);
      const userId = decoded.data.id;
      console.log("ID de usuario decodificado:", userId);
        
      console.log("Verificando contraseña actual...");
      const contraseñaValida = await UsuarioService.verificarContrasenaActual(userId, contraseñaActual);
      console.log("¿Contraseña válida?:", contraseñaValida);
      if (!contraseñaValida) {
        return res.status(401).json({ error: "La contraseña actual es incorrecta" });
      }
  
      await UsuarioService.actualizarContraseña(userId, nuevaContraseña);
      return res.status(200).json({ message: "Contraseña actualizada con éxito" });
  
    } catch (error) {
      return res.status(400).json({ error: "Token inválido o expirado" });
    }
  };
  

export default cambiarContrasena;
