import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import generateToken from "../Helpers/generateToken";

dotenv.config();

const renovarTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1]; // Extraer el token del encabezado

    // Verificar el token
    const decoded = jwt.verify(token, process.env.KEY_TOKEN as string) as any;

    // Generar un nuevo token
    const nuevoToken = generateToken({ id: decoded.id }, process.env.KEY_TOKEN, 5);

    // Configurar el nuevo token en el encabezado de respuesta
    res.setHeader("x-renewed-token", nuevoToken);
    console.log("Nuevo token generado:", nuevoToken);
    // Pasar a la siguiente función
    next();
  } catch (error) {
    console.error("Error al verificar o renovar token", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Middleware para verificar token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extraer token del encabezado

  if (!token) {
    return res.status(401).send('Acceso no autorizado');
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.KEY_TOKEN as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).send('Token inválido');
  }
};

export { renovarTokenMiddleware, verifyToken };
