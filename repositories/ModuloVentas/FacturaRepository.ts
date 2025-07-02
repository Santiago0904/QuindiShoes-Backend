// src/repositories/FacturaRepository.ts
import db from '../../config/config-db'

export default class FacturaRepository {
  static async obtenerFacturasDomicilio() {
    const sql = `SELECT * FROM facturas WHERE metodo_entrega = 'domicilio' ORDER BY id DESC`;
    const [rows]: any = await db.query(sql);

    return rows.map((factura: any) => ({
      ...factura,
      contenido_factura: typeof factura.contenido_factura === 'string'
        ? JSON.parse(factura.contenido_factura)
        : factura.contenido_factura,
    }));
  }
}
