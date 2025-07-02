import { Request, Response } from "express";
import db from "../config/config-db";

function getMostFrequent(obj: Record<string, number>) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1])[0]?.[0];
}

export const obtenerRecomendados = async (req: Request, res: Response) => {
  const id_usuario = Number(req.params.id_usuario);

  try {
    // 1. Historial de reservas del usuario con JOIN a variantes, colores y tallas
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
    const variantesVistas = new Set<number>();

    interface Reserva {
        id_producto: number;
        id_variantes: number;
        tipo_producto: string;
        genero_producto: string;
        id_color: number;
        color: string;
        id_talla: number;
        talla: string;
        fecha: string;
    }

    const reservasTyped: Reserva[] = reservas as Reserva[];

    reservasTyped.forEach((h: Reserva) => {
        variantesVistas.add(h.id_variantes);
        if (h.color) colorPreferido[h.color] = (colorPreferido[h.color] || 0) + 1;
        if (h.tipo_producto) tipoPreferido[h.tipo_producto] = (tipoPreferido[h.tipo_producto] || 0) + 1;
        if (h.genero_producto) generoPreferido[h.genero_producto] = (generoPreferido[h.genero_producto] || 0) + 1;
    });

    const color = getMostFrequent(colorPreferido);
    const tipo = getMostFrequent(tipoPreferido);
    const genero = getMostFrequent(generoPreferido);

    // 3. Recomienda variantes según preferencias y que no haya visto
    const variantesVistasArr = Array.from(variantesVistas);
    let where = [];
    let params: any[] = [];
    if (color) { where.push("c.color = ?"); params.push(color); }
    if (tipo) { where.push("p.tipo_producto = ?"); params.push(tipo); }
    if (genero) { where.push("p.genero_producto = ?"); params.push(genero); }
    let whereClause = where.length ? `WHERE (${where.join(" OR ")})` : "";

    let notInClause = "";
    if (variantesVistasArr.length) {
      notInClause = whereClause ? " AND " : " WHERE ";
      notInClause += `v.id_variantes NOT IN (${variantesVistasArr.map(() => "?").join(",")})`;
      params.push(...variantesVistasArr);
    }

    // Subconsulta para traer la imagen principal (la de menor id_imagen por producto)
    const [recomendados]: any = await db.query(`
      SELECT DISTINCT 
        p.*, v.id_variantes, v.id_color, c.color, v.id_talla, t.talla, v.stock,
        (SELECT i.url_imagen FROM imagenes i WHERE i.id_producto = p.id_producto ORDER BY i.id_imagen ASC LIMIT 1) AS url_imagen
      FROM productos p
      JOIN producto_variantes v ON p.id_producto = v.id_producto
      JOIN colores_producto c ON v.id_color = c.id_color
      JOIN tallas t ON v.id_talla = t.id_talla
      ${whereClause}${notInClause}
      ORDER BY RAND()
      LIMIT 10
    `, params);

    // 4. Si no hay historial o no hay recomendados, muestra variantes aleatorias con imagen
    if (!reservas.length || !recomendados.length) {
      const [populares]: any = await db.query(`
        SELECT DISTINCT 
          p.*, v.id_variantes, v.id_color, c.color, v.id_talla, t.talla, v.stock,
          (SELECT i.url_imagen FROM imagenes i WHERE i.id_producto = p.id_producto ORDER BY i.id_imagen ASC LIMIT 1) AS url_imagen
        FROM productos p
        JOIN producto_variantes v ON p.id_producto = v.id_producto
        JOIN colores_producto c ON v.id_color = c.id_color
        JOIN tallas t ON v.id_talla = t.id_talla
        ORDER BY RAND()
        LIMIT 10
      `);
      return res.json(populares);
    }

    res.json(recomendados);
  } catch (error) {
    console.error("Error en recomendaciones:", error);
    res.status(500).json({ error: "Error al obtener recomendaciones" });
  }
};