// src/repositories/FacturaRepository.ts
import db from '../../config/config-db'

export default class FacturaRepository {
  static async obtenerFacturasDomicilio() {
  const sql = `
    SELECT 
      f.*, 
      u.nombre, 
      u.apellido, 
      u.direccion, 
      u.telefono, 
      u.correo
    FROM facturas f
    JOIN users u ON f.id_usuario = u.id_usuario
    WHERE f.metodo_entrega = 'domicilio'
    ORDER BY f.id DESC
  `;

  const [rows]: any = await db.query(sql);

  return rows.map((factura: any) => ({
    ...factura,
    contenido_factura: typeof factura.contenido_factura === 'string'
      ? JSON.parse(factura.contenido_factura)
      : factura.contenido_factura,
  }));
}

}
