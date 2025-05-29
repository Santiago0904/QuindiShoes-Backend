import db from '../../config/config-db';
import { RowDataPacket } from "mysql2";

class BusquedaRepository {
  static async buscarProductosConFiltros(filtros: any) {
    const {
      nombre,
      categoria,
      precioMin,
      precioMax,
      marca,
      color,
      sexo,
      talla,
      tipo
    } = filtros;

    let sqlObj = { sql: "SELECT * FROM productoReal WHERE 1=1" };
    const values: any[] = [];

    // Utilidad para agregar condiciones dinámicamente
    function agregarFiltro(campo: any, condicion: string, isLike: boolean = false) {
      if (campo !== undefined && campo !== null && campo !== "") {
        sqlObj.sql += condicion;
        values.push(isLike ? `%${campo}%` : campo);
      }
    }

    // Aplicamos cada filtro con su respectiva condición
    agregarFiltro(nombre, " AND nombre_producto LIKE ?", true);
    agregarFiltro(categoria, " AND categoria_producto = ?");
    agregarFiltro(precioMin, " AND precio_producto >= ?");
    agregarFiltro(precioMax, " AND precio_producto <= ?");
    agregarFiltro(marca, " AND marca_producto = ?");
    agregarFiltro(color, " AND colores_producto = ?");
    agregarFiltro(sexo, " AND sexo_producto = ?");
    agregarFiltro(talla, " AND tallas_producto = ?");
    agregarFiltro(tipo, " AND tipo_producto = ?");

    const [rows] = await db.execute<RowDataPacket[]>(sqlObj.sql, values);
    return rows;
  }

  // Aqui va ir la logica de sugerencias cuando se tenga

  static async obtenerSugerencias(query: string) {
    const sql = `SELECT nombre_producto FROM productoReal WHERE nombre_producto LIKE ? LIMIT 5`;
    const [sugerencias] = await db.execute<RowDataPacket[]>(sql, [`%${query}%`]);
    return sugerencias;
  }
}

export default BusquedaRepository;
