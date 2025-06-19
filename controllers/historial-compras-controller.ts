import { Request, Response } from "express";
import db from "../config/config-db";

export const obtenerHistorialCompras = async (req: Request, res: Response) => {
  const id_usuario = Number(req.params.id_usuario);

  try {
    const [facturas]: any = await db.query(
      `SELECT id, fecha_pago, contenido_factura FROM facturas WHERE id_usuario = ? ORDER BY fecha_pago DESC`,
      [id_usuario]
    );
    console.log("Facturas encontradas:", facturas);

    let historial: any[] = [];
    let consultas: any[] = [];

    for (const factura of facturas) {
      let productosFactura = factura.contenido_factura;
      if (!Array.isArray(productosFactura)) productosFactura = [productosFactura];

      for (const item of productosFactura) {
        consultas.push(
          db.query(
            `SELECT 
                p.nombre_producto, p.tipo_producto, p.genero_producto, p.precio_producto,
                v.id_variantes, v.id_talla, t.talla, v.id_color, c.color,
                (SELECT i.url_imagen FROM imagenes i WHERE i.id_producto = p.id_producto LIMIT 1) as url_imagen
              FROM productos p
              JOIN producto_variantes v ON p.id_producto = v.id_producto
              JOIN tallas t ON v.id_talla = t.id_talla
              JOIN colores_producto c ON v.id_color = c.id_color
              WHERE p.id_producto = ? AND v.id_variantes = ?
              LIMIT 1
            `,
            [item.id_producto, item.id_variante || item.id_variantes]
          ).then(([detalles]: any) => ({
            ...detalles[0],
            cantidad: item.cantidad || 1,
            fecha_compra: factura.fecha_pago,
            id_factura: factura.id,
          }))
        );
      }
    }

    historial = await Promise.all(consultas);
    res.json(historial);
  } catch (error) {
    console.error("Error al obtener historial de compras:", error);
    res.status(500).json({ error: "Error al obtener historial de compras" });
  }
};