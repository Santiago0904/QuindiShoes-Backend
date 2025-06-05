import db from '../../config/config-db';

export class TopsRepository {
 async getTopProductosVendidos(limite: number, orden: 'ASC' | 'DESC') {
    const [rows]: [any[], any] = await db.query(

        `
        SELECT fi.id_producto, p.nombre_producto, SUM(fi.cantidad) AS total_vendido, MAX(i.url_imagen) AS imagen_producto
        FROM factura_items fi JOIN productos p ON fi.id_producto = p.id_producto
        LEFT JOIN imagenes i ON p.id_producto = i.id_producto
        GROUP BY fi.id_producto, p.nombre_producto
        ORDER BY total_vendido ${orden}
        LIMIT ?`, [limite]
    );
    return rows;
  }
}

