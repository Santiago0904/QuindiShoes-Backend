import { Request, Response } from "express";
import db from "../config/config-db";

function getMostFrequent(obj: Record<string, number>) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1])[0]?.[0];
}

export const obtenerRecomendados = async (req: Request, res: Response) => {
  const id_usuario = Number(req.params.id_usuario);

  try {
    // 1. Historial de reservas del usuario
    const [reservas]: any = await db.query(`
      SELECT 
        r.id_producto,
        v.id_variantes,
        p.tipo_producto,
        p.genero_producto,
        v.id_color,
        c.color,
        v.id_talla,
        t.talla,
        r.fecha_reserva as fecha
      FROM reservas r
      JOIN producto_variantes v ON r.id_producto = v.id_producto
      JOIN productos p ON r.id_producto = p.id_producto
      JOIN colores_producto c ON v.id_color = c.id_color
      JOIN tallas t ON v.id_talla = t.id_talla
      WHERE r.id_usuario = ?
    `, [id_usuario]);

    // 2. Analiza preferencias
    const colorPreferido: Record<string, number> = {};
    const tipoPreferido: Record<string, number> = {};
    const generoPreferido: Record<string, number> = {};
    const productosVistos = new Set<number>();

    reservas.forEach((h: any) => {
      productosVistos.add(h.id_producto);
      if (h.color) colorPreferido[h.color] = (colorPreferido[h.color] || 0) + 1;
      if (h.tipo_producto) tipoPreferido[h.tipo_producto] = (tipoPreferido[h.tipo_producto] || 0) + 1;
      if (h.genero_producto) generoPreferido[h.genero_producto] = (generoPreferido[h.genero_producto] || 0) + 1;
    });

    const color = getMostFrequent(colorPreferido);
    const tipo = getMostFrequent(tipoPreferido);
    const genero = getMostFrequent(generoPreferido);

    // 3. Recomienda variantes según preferencias y que no haya visto
    const productosVistosArr = Array.from(productosVistos);
    let where = [];
    let params: any[] = [];
    if (color) { where.push("c.color = ?"); params.push(color); }
    if (tipo) { where.push("p.tipo_producto = ?"); params.push(tipo); }
    if (genero) { where.push("p.genero_producto = ?"); params.push(genero); }
    let whereClause = where.length ? `WHERE (${where.join(" OR ")})` : "";

    let notInClause = "";
    if (productosVistosArr.length) {
      notInClause = whereClause ? " AND " : " WHERE ";
      notInClause += `p.id_producto NOT IN (${productosVistosArr.map(() => "?").join(",")})`;
      params.push(...productosVistosArr);
    }

    // 4. Consulta agrupando por producto para evitar duplicados
    const [recomendados]: any = await db.query(`
      SELECT 
        p.*, 
        v.id_variantes, v.id_color, c.color, v.id_talla, t.talla, v.stock,
        (SELECT i.url_imagen FROM imagenes i WHERE i.id_producto = p.id_producto LIMIT 1) AS url_imagen
      FROM productos p
      JOIN producto_variantes v ON v.id_producto = p.id_producto
      JOIN colores_producto c ON v.id_color = c.id_color
      JOIN tallas t ON v.id_talla = t.id_talla
      ${whereClause}${notInClause}
      ORDER BY RAND()
      LIMIT 50
    `, params);

    // Filtra productos únicos por id_producto
    const productosUnicos = [];
    const ids = new Set();
    for (const prod of recomendados) {
      if (!ids.has(prod.id_producto)) {
        productosUnicos.push(prod);
        ids.add(prod.id_producto);
      }
    }

    // 5. Si no hay historial o no hay recomendados, muestra productos aleatorios (sin duplicados)
    if (!reservas.length || !productosUnicos.length) {
      const [populares]: any = await db.query(`
  SELECT 
  p.id_producto,
  p.nombre_producto,
  p.tipo_producto,
  p.genero_producto,
  p.precio_producto,
  MAX(v.id_variantes) AS id_variantes,
  MAX(v.id_color) AS id_color,
  MAX(c.color) AS color,
  MAX(v.id_talla) AS id_talla,
  MAX(t.talla) AS talla,
  MAX(v.stock) AS stock,
  (
    SELECT i.url_imagen 
    FROM imagenes i 
    WHERE i.id_producto = p.id_producto 
    LIMIT 1
  ) AS url_imagen
FROM productos p
JOIN producto_variantes v ON p.id_producto = v.id_producto
JOIN colores_producto c ON v.id_color = c.id_color
JOIN tallas t ON v.id_talla = t.id_talla
GROUP BY p.id_producto
ORDER BY RAND()
LIMIT 10
`);
      return res.json(populares);
    }

    return res.json(productosUnicos.slice(0, 10));
  } catch (error) {
    console.error("Error en recomendaciones:", error);
    return res.status(500).json({ error: "Error al obtener recomendaciones" });
  }
};
