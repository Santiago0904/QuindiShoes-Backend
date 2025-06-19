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
    x_franchise,
    x_xextra2,
    x_extra2,
  } = req.body;

  // Usa x_xextra2 si existe, si no x_extra2
  const extra2 = x_xextra2 || x_extra2;

  const sqlFactura = `
    INSERT INTO facturas (
      ref_payco,
      transaction_id,
      estado,
      valor,
      moneda,
      metodo_pago,
      id_usuario,
      contenido_factura,
      fecha_pago
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  await db.query(sqlFactura, [
    x_ref_payco || null,
    x_transaction_id || null,
    x_respuesta || null,
    x_amount || null,
    x_currency_code || null,
    x_franchise || null,
    id_usuario,
    extra2 || null,
    req.body.x_fecha_transaccion || new Date() // <-- aquí la fecha
  ]);

  // Intentar guardar reserva, pero si falla NO afecta la factura
  try {
    const datosExtra = JSON.parse(extra2 || '{}');
    const id_producto = datosExtra.id_producto;
    const tipo = datosExtra.tipo;
    if (id_producto && tipo === "reserva") {
      const sqlReserva = `
        INSERT INTO reservas (
          id_producto,
          id_usuario,
          fecha_reserva,
          estado,
          monto,
          notificado
        ) VALUES (?, ?, NOW(), ?, ?, 0)
      `;
      await db.query(sqlReserva, [
        id_producto,
        id_usuario,
        x_respuesta,
        x_amount
      ]);
      console.log("Reserva guardada correctamente para el producto:", id_producto);
    } else {
      console.log("No es una reserva, no se guarda en la tabla reservas.");
    }
  } catch (err) {
    console.error("Error al guardar reserva:", err);
  }
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

