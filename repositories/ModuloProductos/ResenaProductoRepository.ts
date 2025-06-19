import db from '../../config/config-db';
import { ResenaProductoDto } from '../../Dto/ResenaProductoDto';

class ResenaProductoRepository {
  static async agregarResena(resena: ResenaProductoDto) {
    const sql = `INSERT INTO resenas_producto (id_producto, id_usuario, resena, puntuacion, fecha_resena) VALUES (?, ?, ?, ?, NOW())`;
    const values = [resena.id_producto, resena.id_usuario, resena.resena, resena.puntuacion ?? null];
    await db.execute(sql, values);
  }

  static async obtenerResenasPorProducto(id_producto: number) {
    const sql = `
      SELECT 
        r.id_resena,
        r.id_usuario,           -- <--- AGREGA ESTA LÍNEA
        r.resena,
        r.fecha_resena,
        r.puntuacion,
        u.nombre AS nombre_usuario
      FROM resenas_producto r
      JOIN users u ON r.id_usuario = u.id_usuario
      WHERE r.id_producto = ?
      ORDER BY r.fecha_resena DESC
    `;
    const [rows] = await db.execute(sql, [id_producto]);
    return rows;
  }

  static async eliminarResena(id_resena: number, id_usuario: number) {
    const sql = `DELETE FROM resenas_producto WHERE id_resena = ? AND id_usuario = ?`;
    await db.execute(sql, [id_resena, id_usuario]);
  }

  static async actualizarResena({ id_resena, id_usuario, resena, puntuacion }: { id_resena: number, id_usuario: number, resena: string, puntuacion: number }) {
    const sql = `UPDATE resenas_producto SET resena = ?, puntuacion = ? WHERE id_resena = ? AND id_usuario = ?`;
    await db.execute(sql, [resena, puntuacion, id_resena, id_usuario]);
  }
}

export default ResenaProductoRepository;