import db from '../../config/config-db';

export class TopsRepository {
 async getTopProductosVendidos(limite: number, orden: 'ASC' | 'DESC') {
    const [rows]: [any[], any] = await db.query(

        `
       SELECT 
      p.id_producto,
      p.nombre_producto,
      COALESCE(SUM(fi.cantidad), 0) AS total_vendido,
      MAX(i.url_imagen) AS imagen_producto
      FROM productos p
      LEFT JOIN factura_items fi ON p.id_producto = fi.id_producto
      LEFT JOIN imagenes i ON p.id_producto = i.id_producto
      GROUP BY p.id_producto, p.nombre_producto
      ORDER BY total_vendido ${orden}
      LIMIT ?`, [limite]
    );
    return rows;
  }

  async getProductosInactivos() {
    const [rows]: [any[], any] = await db.query(
      `SELECT 
  p.id_producto,
  p.nombre_producto,
  p.precio_producto,
  COALESCE(SUM(pv.stock), 0) AS stock,
  MIN(img.url_imagen) AS url_imagen
FROM productos p
LEFT JOIN (
  SELECT DISTINCT fi.id_producto
  FROM factura_items fi
  WHERE WEEK(fi.fecha_pago) = WEEK(CURDATE())
    AND YEAR(fi.fecha_pago) = YEAR(CURDATE())
) vendidos_semana ON p.id_producto = vendidos_semana.id_producto
LEFT JOIN producto_variantes pv ON p.id_producto = pv.id_producto
LEFT JOIN imagenes img ON p.id_producto = img.id_producto
WHERE vendidos_semana.id_producto IS NULL
GROUP BY p.id_producto, p.nombre_producto, p.precio_producto;
`
    );
    return rows;
  }
}

