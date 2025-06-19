import db from '../config/config-db';
import { Request, Response } from "express";

export const guardarFactura = async (req: Request) => {
  console.log("Datos recibidos en guardarFactura:", req.body);

  // Usa x_xextra1 si existe, si no x_extra1
  const id_usuario = parseInt(req.body.x_xextra1 || req.body.x_extra1);
  if (!id_usuario || isNaN(id_usuario)) {
    throw new Error(`id_usuario no válido: ${req.body.x_xextra1 || req.body.x_extra1}`);
  }

  const {
    x_ref_payco,
    x_transaction_id,
    x_respuesta,
    x_amount,
    x_currency_code,
    x_fecha_transaccion,
    x_franchise,
    x_xextra2,
    x_extra2,
    x_xextra3
  } = req.body;

  // Usa x_xextra2 si existe, si no x_extra2
  const extra2 = x_xextra2 || x_extra2;

  // 1. Insertar la factura y obtener su ID
  const sqlFactura = `
  INSERT INTO facturas (
    ref_payco,
    transaction_id,
    estado,
    valor,
    moneda,
    fecha_pago,
    metodo_pago,
    id_usuario,
    contenido_factura,
      descuento
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
  const [result]: any = await db.query(sqlFactura, [
    x_ref_payco,
    x_transaction_id,
    x_respuesta,
    x_amount,        
    x_currency_code,
    x_fecha_transaccion,
    x_franchise,
    id_usuario,
    x_xextra2,
    x_xextra3,
  ]);

  const id_factura = result.insertId; // ← obtenemos el ID generado

  // 2. Insertar los items de la factura
  const productos = JSON.parse(x_xextra2);

  const sqlItem = `
  INSERT INTO factura_items (
    id_factura,
    id_producto,
    id_talla,
    cantidad,
    id_color,
    precio_unitario,
    fecha_pago
  ) VALUES (?, ?, ?, ?, ?, ?, ?)
`;

for (const producto of productos) {
  await db.query(sqlItem, [
    id_factura,
    producto.id_producto,
    producto.id_talla,
    producto.cantidad,
    producto.id_color,
    producto.precio_producto,
    x_fecha_transaccion
  ]);
}


  console.log(`✅ Factura guardada con ID ${id_factura} y ${productos.length} items`);
};



export const obtenerFacturas = async (req: any, res: any) => {
  try {
    const [rows]: any = await db.query(
      `SELECT * FROM facturas ORDER BY id DESC`
    );

    const facturas = rows.map((factura: any) => ({
      ...factura,
      contenido_factura: typeof factura.contenido_factura === 'string'
        ? JSON.parse(factura.contenido_factura)
        : factura.contenido_factura,
    }));

    res.json(facturas);
  } catch (error) {
    console.error("Error al obtener todas las facturas:", error);
    res.status(500).json({ message: 'Error al obtener las facturas' });
  }
}

