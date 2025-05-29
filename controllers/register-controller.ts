import { Request, Response } from "express";
import UsuarioService from '../services/ModuloUsuarios/UserServices';
import jwt from 'jsonwebtoken';
import { ValidarCorreo } from '../services/ModuloUsuarios/ValidarCorreoService';
import generateHash from "../Helpers/generateHash";
import Usuario from "../Dto/UsuarioDto";
import generateToken from "../Helpers/generateToken";

// Registro de usuario: genera un JWT con todos los datos y envía enlace para confirmar
const register = async (req: Request, res: Response) => {
    try {
      // Cambio: desestructuramos "contrasena" (sin tilde) en lugar de "contraseña"
      const { nombres, apellidos, telefono, direccion, correo, rol, contrasena } = req.body;
  
      console.log("Datos del formulario recibidos en backend:", req.body);
  
      // Verificar si el correo ya está registrado
      const usuario = await UsuarioService.EncontrarCorreo(correo);
      if (usuario) {
        return res.status(400).json({ error: "El correo ya está registrado." });
      }
  
      // Crear el objeto de usuario para generar el token
      const payload = {
        nombres,
        apellidos,
        telefono,
        direccion,
        correo,
        rol,
        // Cambio: usamos contrasena aquí
        contrasena: await generateHash(contrasena),
      };
  
      // Generar token con el payload
      const token = generateToken(payload, process.env.KEY_TOKEN!, 60); // Token válido por 1h
  
      // Enviar el enlace de confirmación por correo
      const urlConfirm = `http://localhost:5173/esperando-confirmacion?token=${token}`;
      await ValidarCorreo(correo, urlConfirm);
  
      // Responder con mensaje de éxito
      return res.status(201).json({
        message: "Registro iniciado. Revisa tu correo para confirmar tu cuenta.",
        token: token, // Enviar el token por si lo necesitas en el frontend
      });
    } catch (error: any) {
      console.error("Error en el registro:", error);
      return res.status(500).json({ error: "Error en el servidor al registrar el usuario." });
    }
  };
  
// Confirmación de correo desde /confirmar-correo
const confirmarCorreo = async (req: Request, res: Response) => {
  try {
    const { token } = req.query; // El token se pasa por query en la URL
    console.log("Token recibido desde query:", token);

    if (!token) {
      return res.status(400).json({ error: "Token no proporcionado." });
    }

    // Decodificar el token y obtener el payload
    // Cambio: en el payload cambiamos "contraseña" por "contrasena"
    const payload = jwt.verify(token as string, process.env.KEY_TOKEN!) as {
      nombres: string;
      apellidos: string;
      telefono: string;
      direccion: string;
      correo: string;
      rol: string;
      contrasena: string;
    };

    console.log("Payload decodificado:", payload);

    const { nombres, apellidos, telefono, direccion, correo, rol, contrasena } = payload;

    // Verificar si el usuario ya está registrado
    const usuarioExistente = await UsuarioService.EncontrarCorreo(correo);
    if (usuarioExistente) {
      return res.status(400).json({ error: "Este correo ya fue confirmado anteriormente." });
    }

    // Crear el nuevo usuario y registrarlo
    const usuario = new Usuario(nombres, apellidos, telefono, direccion, correo, rol, contrasena);
    console.log("Registrando usuario:", usuario);

    await UsuarioService.register(usuario);

    // Responder con éxito al confirmar el correo
    return res.status(200).json({ message: "Correo confirmado con éxito." });
  } catch (error: any) {
    console.error("Error en confirmarCorreo:", error);
    return res.status(400).json({ error: "Token inválido o expirado." });
  }
};

// Verificar estado de correo
// Ruta para verificar el correo y registrar al usuario
export const verificarEstadoCorreo = async (req: Request, res: Response) => {
    try {
      const { token } = req.query;
      
      if (!token) {
        return res.status(400).json({ error: "Token no proporcionado." });
      }
      
      // Decodificar el token
      const decoded = jwt.verify(token as string, process.env.KEY_TOKEN!) as {
        data: {
          nombres: string;
          apellidos: string;
          telefono: string;
          direccion: string;
          correo: string;
          rol: string;
          contrasena: string;
        };
      };
      
      const payload = decoded.data;
      
      console.log("✅ Payload extraído del token:", payload);
      
      if (!payload.correo) {
        return res.status(400).json({ error: "El correo no es válido." });
      }
      
      // Verificar si el usuario ya está registrado
      const usuarioExistente = await UsuarioService.EncontrarCorreo(payload.correo);
      if (usuarioExistente) {
        return res.status(400).json({ error: "Este correo ya fue confirmado anteriormente." });
      }
      
      // Crear el nuevo usuario y registrarlo
      const usuario = new Usuario(
        payload.nombres,
        payload.apellidos,
        payload.telefono,
        payload.direccion,
        payload.correo,
        payload.rol,
        "",
        payload.contrasena  // Cambio: usamos contrasena
      );
      
      await UsuarioService.register(usuario);
      
      return res.status(200).json({ message: "Correo confirmado con éxito. Usuario registrado." });
    } catch (error: any) {
      console.error("Error verificando el estado del correo:", error);
      return res.status(400).json({ error: "Token inválido o expirado." });
    }
    };
  

// Obtener lista de empleados (esto no cambia)
export const obtenerEmpleados = async (req: Request, res: Response) => {
  try {
    const empleados = await UsuarioService.obtenerEmpleados();
    return res.status(200).json(empleados);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    return res.status(500).json({ error: "Error al obtener los empleados" });
  }
};

// Eliminar un empleado
export const eliminarEmpleado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await UsuarioService.eliminarEmpleado(Number(id));
    return res.status(200).json({ message: "Usuario eliminado con éxito." });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

export default {
  register,
  confirmarCorreo,
  verificarEstadoCorreo,
};
