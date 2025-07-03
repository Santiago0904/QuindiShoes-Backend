import Materiales from "../../Dto/MaterialesDto";
import Colores from "../../Dto/ColoresDto";
import ZonaProducto from "../../Dto/ZonaProductosDto";
import db from '../../config/config-db';


class PersonalizacionRepository {   

    // Materiales
    static async addMateriales(materiales: Materiales) {
      console.log("Datos recibidos en el insert:", materiales);
        const sql = 'call InsertarMaterial(?,?);';
        const values = [materiales.nombre_material, materiales.material_img];
        return db.execute(sql, values);
    }

    static async ActualizarMaterial(id: number, material: Materiales) {
        console.log("Datos recibidos en el update:",  material, "ID",id,);
        const sql = `
          call ActualizarMaterial(?,?);
        `;
    
        const values = [
          id,
          material.nombre_material
        ];
        return await db.execute(sql, values);
      }

      

      static async obtenerMaterial() {
          const [rows] = await db.execute('SELECT * FROM materiales');
          console.log(rows);
          return rows;
        }

    static async deleteMateriales(id: number) {
        const sql = 'call EliminarMaterial(?);';
        await db.execute(sql, [id]);
    }

    // Colores

    static async addColores(colores: Colores) {
        const sql = 'call InsertarColor(?, ?);';
        const values = [colores.nombreColor, colores.codigoHax];
        return db.execute(sql, values);
    }   

    static async ActualizarColor(id: number, color: Colores) {
        console.log("Datos recibidos en el update:", "ID:", id, color);
        const sql = `
          call ActualizarColor(?,?,?);
        `;
    
        const values = [
          id,
          color.nombreColor,
          color.codigoHax
          
        ];
        return await db.execute(sql, values);
      }

      static async obtenerColores() {
        const [rows] = await db.execute('SELECT * FROM colores');
        console.log(rows);
        return rows;
      }

    static async deleteColores(id: number) {
        const sql = 'call EliminarColor(?);';
        await db.execute(sql, [id]);
    }


    // Zona Producto
    static async addZonaProducto(zonaProducto: ZonaProducto) {
        const sql = 'call InsertarZonaProductos(?);';
        const values = [zonaProducto.nombreZona];
        return db.execute(sql, values);
    }

    static async ActualizarZonaProducto(id: number, zonaProducto: ZonaProducto) {
        console.log("Datos recibidos en el update:", zonaProducto, "ID:", id);
        const sql = `
          call ActualizarZona(?,?);
        `;
    
        const values = [
          id,
          zonaProducto.nombre_zona,
          
        ];
        return await db.execute(sql, values);
      }   

      static async obtenerZonaProducto() {
        const [rows] = await db.execute('SELECT * FROM zona_productos');
        console.log(rows);
        return rows;
      }

    static async deleteZonaProducto(id: number) {
        const sql = 'call EliminarZonaProductos(?);';
        await db.execute(sql, [id]);
    }

    static async sumarUsoColoresPorNombre(nombres: string[]) {
      for (const nombre of nombres) {
        // Suma 1 a color_uso donde el nombre coincida
        console.log("Actualizando color_uso para el color:", nombre);
        const sql = 'UPDATE colores SET color_uso = color_uso + 1 WHERE nombre_color = ?;';
        await db.execute(sql, [nombre]);
      }
      return { message: "color_uso actualizado correctamente" };
    }

    static async obtenerTopColores() {
      const [rows] = await db.query(
        "SELECT id_color, nombre_color, codigo_hax, color_uso as usos FROM colores ORDER BY color_uso DESC LIMIT 10"
      );
      return rows;
    }

    // Personalizador 3D
  static async guardarModeloGLB(id_usuario: number, buffer: Buffer) {
    const sql = `
      INSERT INTO personalizacion (personalizacion_img, id_usuario)
      VALUES (?, ?)
    `;
    await db.execute(sql, [buffer, id_usuario]);
  }

static async obtenerModelosPorUsuario(id_usuario: number) {
  const query = `
    SELECT id_personalizacionCalzado, personalizacion_img, fecha
    FROM personalizacion
    WHERE id_usuario = ?`;

  const [rows] = await db.execute(query, [id_usuario]);

  // Forzar que sea array
  return Array.isArray(rows) ? rows : [];
}

static async obtenerModeloPorId(id_modelo: number) {
  const query = "SELECT personalizacion_img FROM personalizacion WHERE id_personalizacionCalzado = ?";
  const [rows]: any = await db.execute(query, [id_modelo]);
  if (rows[0]) {
    console.log("Repository - Buffer length:", rows[0].personalizacion_img?.length);
  } else {
    console.log("Repository - Modelo no encontrado");
  }
  return rows[0];
}

static async obtenerModelos() {
  const [rows] = await db.query(
    "SELECT id_personalizacionCalzado as id, fecha FROM personalizacion"
  );
  return rows;
}



}

export default PersonalizacionRepository;
