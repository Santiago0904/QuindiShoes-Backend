import db from '../../config/config-db'
import Auth from '../../Dto/AuthDto';
import bcrypt from 'bcryptjs';
import Usuario from '../../Dto/UsuarioDto';
import ResenaDto from '../../Dto/resenaDto';


class UsuarioRepository {

    static async ActualizarContraseña(id: number, nuevaContraseña: string) {
        const sql = 'UPDATE users SET contraseña = ? WHERE id_usuario = ?';
        return await db.execute(sql, [nuevaContraseña, id]);
      }

      static async verificarContraseña(id: number) {
        const sql = 'SELECT contraseña FROM users WHERE id_usuario = ?';
        const [rows]: any = await db.execute(sql, [id]);
        console.log("Contraseña recuperada de la base de datos:", rows[0]?.contraseña);  // Verifica el valor de la contraseña
        return rows[0]?.contraseña; // Retorna la contraseña actual
      }

      static async ObtenerUsuarioPorId(id: number) {
        const sql = 'SELECT id_usuario, nombre, correo, resena, fecha_resena FROM users WHERE id_usuario = ?';
        const [rows]: any = await db.execute(sql, [id]);
        return rows[0];
      }

    static async eliminarEmpleado(id: number) {
        const sql = 'DELETE FROM users WHERE id_usuario = ?';
        await db.execute(sql, [id]);
    }


    static async ActualizarEmpleado(usuario: Usuario,id: number) {
        console.log("Datos recibidos en el update:", usuario, "ID:", id);
        const sql = `
          UPDATE users SET 
            nombre = ?,
            apellido = ?,
            telefono = ?,
            direccion = ?,
            correo = ?,
            rol = ?
          WHERE id_usuario = ?
        `;
    
        const values = [
          usuario.nombres,
          usuario.apellidos,
          usuario.telefono,
          usuario.direccion,
          usuario.correo,
          usuario.rol,
          id
        ];
        return await db.execute(sql, values);
      }
  
    
    
      static async EncontrarCorreo(correo: string) {
        if (!correo) {
          throw new Error('El parámetro correo no puede ser null o undefined');
        }
      
        const sql = 'SELECT * FROM users WHERE correo = ? LIMIT 1';
        const [rows]: any = await db.execute(sql, [correo]);
      
        if (!rows || rows.length === 0) return null;
      
        const usuario = rows[0];
        return {
          id: usuario.id_usuario,
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          correo: usuario.correo,
          contraseña: usuario.contraseña,
        };
      }
      

      static async estaVerificado(correo: string): Promise<boolean> {
        const sql = 'SELECT verificado FROM users WHERE correo = ?';
        const values = [correo];
        
        try {
          const [result]: [{ verificado: number }[]] = (await db.execute(sql, values))[0] as [{ verificado: number }[]];
          if (result && result.length > 0) {
            return result[0].verificado === 1; 
          }
          return false; 
        } catch (error) {
          console.error('Error consultando la verificación:', error);
          throw new Error('No se pudo verificar el estado del usuario');
        }
      }

    static async addUser(usuario: Usuario){
        const sql = 'call Insertar_usuarios(?, ?, ?, ?, ?, ?, ?);';
        const values = [usuario.nombres,usuario.apellidos,usuario.telefono,usuario.direccion,usuario.correo,usuario.contraseña,usuario.rol];
        return await db.execute(sql, values);
     
    }
    
    static async loginUser(auth: Auth) {
      const sql = 'SELECT id_usuario, contraseña, rol FROM users WHERE correo=?;';
      const values = [auth.correo];
  
      try {
          const [result]: any = await db.execute(sql, values);
  
          if (!auth.contraseña) {
              return { logged: false, status: "Password is required" };
          }
  
          if (!result || result.length === 0 || !result[0]) {
              console.log("Usuario no encontrado en la base de datos.");
              return { logged: false, status: "Invalid username or password" };
          }
  
          if (!result[0].contraseña) {
              console.log("Error: la contraseña en la base de datos es NULL o undefined.");
              return { logged: false, status: "Invalid username or password" };
          }
         
          const isPasswordValid = await bcrypt.compare(auth.contraseña, result[0].contraseña);
  
          if (isPasswordValid) {
              return { logged: true, status: "Successful authentication", id: result[0].id_usuario, rol: result[0].rol };
          }
  
          return { logged: false, status: "Invalid username or password" };
  
      } catch (error) {
          console.error("Error during login:", error);
          return { logged: false, status: "Server error" };
      }
  }

  static async obtenerEmpleados() {
      const [rows] = await db.execute('SELECT * FROM users WHERE rol = "vendedor" OR rol = "domiciliario"');
      console.log(rows);
      return rows;
    }

    static async obtenerInfoUsuario(id: number) {
      const [rows]: any = await db.execute('CALL obtenerInfoUsuario(?)', [id]);
      return rows[0][0]; // El primer usuario que conicnida con este id
    }

    static async agregarResena(resena: ResenaDto) {
      const sql = 'UPDATE users SET resena = ?, fecha_resena = ? WHERE id_usuario = ?';
      const values = [resena.resena, resena.fecha_resena, resena.id_usuario];
      await db.execute(sql, values);
    }

    static async guardarPuntuacion(usuarioId: number, puntuacion: number) {
      console.log("Guardando puntuación:", usuarioId, puntuacion);
      const sql = 'CALL GuardarPuntuacion(?, ?)';
      console.log("SQL:", sql);
      const values = [usuarioId, puntuacion];
      console.log("Valores:", values);
      await db.execute(sql, values);
      console.log("Puntuación guardada correctamente");
    }

    static async ObtenerTops() {
      const sql = 'CALL TraerTops()';
      console.log("Ejecutando SQL para obtener tops:", sql);
      const [rows]: any = await db.execute(sql);
      console.log("Tops obtenidos:", rows);
      return rows;
      console.log("Tops obtenidos correctamente");
    }
    
    static async editarResena({ resena, fecha_resena, id_usuario }: { resena: string; fecha_resena: string; id_usuario: number }) {
      await db.query(
        `UPDATE users SET resena = ?, fecha_resena = ? WHERE id_usuario = ?`,
        [resena, fecha_resena, id_usuario]
      );
    }

    static async eliminarResena(id_usuario: number): Promise<void> {
      await db.query(
        `UPDATE users SET resena = NULL, fecha_resena = NULL WHERE id_usuario = ?`,
        [id_usuario]
      );
    }
 
    static async obtenerTodasLasResenas() {
        const [rows]: any = await db.execute(
            'SELECT id_usuario, nombre, resena, fecha_resena FROM users WHERE resena IS NOT NULL'
        );
        return rows;
    }
}


export default UsuarioRepository;