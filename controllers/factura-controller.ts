import db from '../config/config-db';
import { Request, Response } from "express";

export const guardarFactura = async (req: Request) => {
  const {
    x_ref_payco,
    x_transaction_id,
    x_respuesta,
    x_amount,
    x_currency_code,
    x_franchise,
    x_xextra1,
    x_xextra2,
  } = req.body;

  if (!x_xextra1 || isNaN(parseInt(x_xextra1))) {
    throw new Error(`id_usuario no válido: ${x_xextra1}`);
  }

  const id_usuario = parseInt(x_xextra1);

  const sql = `
    INSERT INTO facturas (
      ref_payco,
      transaction_id,
      estado,
      valor,
      moneda,
      metodo_pago,
      id_usuario,
      contenido_factura
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  await db.query(sql, [
    x_ref_payco,
    x_transaction_id,
    x_respuesta,
    x_amount,
    x_currency_code,
    x_franchise,
    id_usuario,
    x_xextra2
  ]);
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

