import { Request, Response } from "express";
import Auth from '../Dto/AuthDto';
import UsuarioService from '../services/ModuloUsuarios/UserServices';
import generateToken from '../Helpers/generateToken';
import dotenv from "dotenv";
dotenv.config();

const auth = async (req: Request, res: Response) => {
  try {
    // Cambiado: usar "contrasena" (sin ñ) en lugar de "contraseña"
    const { correo, contrasena, rol, recaptchaToken } = req.body;

    // Validar token de reCAPTCHA
    if (!recaptchaToken) {
      return res.status(400).json({ status: "Recaptcha token is required" });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
    const data = await recaptchaRes.json();

    if (!data.success) {
      return res.status(400).json({ status: "Recaptcha verification failed" });
    }

    // Verificar login: se crea el objeto Auth utilizando "contrasena"
    const login = await UsuarioService.login(new Auth(correo, contrasena, rol));

    if (login.logged) {
      const payload = {
        id: login.id,       // Incluye el ID del usuario
        rol: login.rol,     // Puedes incluir más info si quieres
      };

      const token = generateToken(payload, process.env.KEY_TOKEN, 5); // Expira en 5 horas (o lo que uses)

      return res.status(200).json({
        status: login.status,
        token: token,
        rol: login.rol,
        id: login.id, // Opcional: enviar también el ID del usuario
      });
    }

    return res.status(401).json({ status: login.status });

  } catch (error) {
    console.error("❌ Error en login:", error);
    return res.status(500).json({ status: "Server error" });
  }
};

export default auth;
