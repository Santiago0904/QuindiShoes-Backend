import db from '../../config/config-db';
import { RowDataPacket } from "mysql2";

class BusquedaRepository {
  static async buscarProductosConFiltros(filtros: any) {
    const {
      nombre,
      tipo,
      precioMin,
      precioMax,
      color,
      genero,
      talla,
    } = filtros;

    let sql = `
      SELECT 
        p.id_producto,
        p.nombre_producto,
        p.tipo_producto,
        p.genero_producto,
        p.precio_producto,
        v.id_variantes,
        v.stock,
        v.id_color,
        c.color,
        v.id_talla,
        t.talla,
        (SELECT i.url_imagen FROM imagenes i WHERE i.id_producto = p.id_producto LIMIT 1) AS url_imagen
      FROM productos p
      JOIN producto_variantes v ON p.id_producto = v.id_producto
      JOIN colores_producto c ON v.id_color = c.id_color
      JOIN tallas t ON v.id_talla = t.id_talla
      WHERE 1=1
    `;
    const values: any[] = [];

    if (nombre) {
      sql += " AND p.nombre_producto LIKE ?";
      values.push(`%${nombre}%`);
    }
    if (tipo) {
      sql += " AND p.tipo_producto = ?";
      values.push(tipo);
    }
    if (precioMin) {
      sql += " AND p.precio_producto >= ?";
      values.push(precioMin);
    }
    if (precioMax) {
      sql += " AND p.precio_producto <= ?";
      values.push(precioMax);
    }
    if (color) {
      sql += " AND c.color = ?";
      values.push(color);
    }
    if (genero) {
      sql += " AND p.genero_producto = ?";
      values.push(genero);
    }
    if (talla) {
      sql += " AND t.talla = ?";
      values.push(talla);
    }

    sql += " ORDER BY p.nombre_producto ASC";

    const [rows] = await db.execute<RowDataPacket[]>(sql, values);
    return rows;
  }

  static async obtenerSugerencias(query: string) {
    const sql = `
      SELECT DISTINCT p.nombre_producto 
      FROM productos p
      WHERE p.nombre_producto LIKE ? 
      LIMIT 5
    `;
    const [sugerencias] = await db.execute<RowDataPacket[]>(sql, [`%${query}%`]);
    return sugerencias;
  }
}

export default BusquedaRepository;
