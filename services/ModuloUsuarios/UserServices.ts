import UsuarioRepository from '../../repositories/ModuloUsuarios/UsuarioRepository';
import generateHash from '../../Helpers/generateHash';
import Auth from '../../Dto/AuthDto';
import Usuario from '../../Dto/UsuarioDto';
import bcrypt from 'bcryptjs';

// Interfaz para el usuario temporal
interface UsuarioTemporal {
  correo: string;
  contraseña: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  tokenVerificacion: string;
}

class UsuarioService {
  static async actualizarEmpleado(usuario: Usuario, id: number) {
    return await UsuarioRepository.ActualizarEmpleado(usuario, id);
  }

  static async EncontrarCorreo(correo: string) {
    return await UsuarioRepository.EncontrarCorreo(correo);
  }

  static async register(usuario: Usuario) {
    if (!usuario.contraseña) {
      throw new Error("La contraseña es obligatoria para el registro.");
    }
    
    // Si la contraseña ya parece estar hasheada, no la volvemos a hashear.
    if (!usuario.contraseña.startsWith("$2a$") && !usuario.contraseña.startsWith("$2b$")) {
      usuario.contraseña = await generateHash(usuario.contraseña);
    }
    
    console.log("Contraseña final a guardar:", usuario.contraseña);
    return await UsuarioRepository.addUser(usuario);
  }

  static async login(auth: Auth) {
    return await UsuarioRepository.loginUser(auth);
  }

  static async obtenerEmpleados() {
    return await UsuarioRepository.obtenerEmpleados();
  }

  static async eliminarEmpleado(id: number) {
    await UsuarioRepository.eliminarEmpleado(id);
  }


  static async verificarContrasenaActual(id: number, contraseñaActual: string) {
    console.log("ID recibido:", id);
    const contraseñaGuardada = await UsuarioRepository.verificarContraseña(id);
    return await bcrypt.compare(contraseñaActual, contraseñaGuardada);
  }

  static async actualizarContraseña(id: number, nuevaContraseña: string) {
    const hash = await generateHash(nuevaContraseña);
    await UsuarioRepository.ActualizarContraseña(id, hash);
  }
  static async verificarUsuario(correo: string): Promise<string> {
    try {
      const verificado = await UsuarioRepository.estaVerificado(correo);
      
      if (verificado) {
        return 'El usuario está verificado.';
      } else {
        return 'El usuario no está verificado. Revisa tu correo para confirmar tu cuenta.';
      }
    } catch (error) {
      console.error('Error en la verificación del usuario:', error);
      throw new Error('Hubo un problema al verificar el estado del usuario.');
    }
  }

      static async obtenerInfoUsuario(id: number) {
        console.log("ID recibido:", id);
        const datos = await UsuarioRepository.obtenerInfoUsuario(id);
        if (!datos) {
          throw new Error("Usuario no encontrado");
        }   

        return {
            nombre: datos.nombre,
            telefono: datos.telefono,
            direccion: datos.direccion,
            correo: datos.correo
          };
      }


  
  static async crearUsuarioTemporal({
    correo,
    contraseña,
    nombres,
    apellidos,
    telefono,
    direccion,
    tokenVerificacion,
  }: UsuarioTemporal) {
    const contraseñaHasheada = await generateHash(contraseña); // Cifrar la contraseña antes de guardarla

    const nuevoUsuarioTemporal = {
      correo,
      contraseña: contraseñaHasheada,
      nombres,
      apellidos,
      telefono,
      direccion,
      tokenVerificacion,
      estado: "pendiente",
    };

    // Aquí podrías llamar a un repositorio si estás guardando en base de datos
    // return await UsuarioRepository.agregarUsuarioTemporal(nuevoUsuarioTemporal);
    console.log("Usuario temporal creado:", nuevoUsuarioTemporal);
  }
}

export default UsuarioService;
