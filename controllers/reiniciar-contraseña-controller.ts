// controllers/reset-password-controller.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UsuarioRepository from '../repositories/ModuloUsuarios/UsuarioRepository';

const reiniciarContraseña = async (req: Request, res: Response) => {
  const { token, contraseña } = req.body;

  try {
    const decoded: any = jwt.verify(token, process.env.KEY_TOKEN!);
    const userId = decoded.id;

    const hash = await bcrypt.hash(contraseña, 10);

    await UsuarioRepository.ActualizarContraseña(userId, hash);

    return res.status(200).json({ message: "Contraseña restablecida con éxito" });
  } catch (error) {
    return res.status(400).json({ error: "Token inválido o expirado" });
  }
};

export default reiniciarContraseña;
