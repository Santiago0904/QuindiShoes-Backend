import db from "../../config/config-db";

export const obtenerVentasHistoricas = async () => {
  const [filas] = await db.query(`
   SELECT 
  DATE(f.fecha_pago) AS fecha,
  SUM(fi.cantidad * fi.precio_unitario) AS total
FROM facturas f
JOIN factura_items fi ON f.id = fi.id_factura
WHERE 
	f.fecha_pago IS NOT NULL
  AND fi.cantidad > 0
  AND fi.precio_unitario > 0
GROUP BY fecha
ORDER BY fecha;
  `) as [any[], any];

  console.log("Ventas crudas desde BD:", filas);

  const ventasFiltradas = filas
    .filter((fila: any) => fila.total !== null && !isNaN(fila.total))
    .map((fila: any) => ({
      fecha: fila.fecha,
      total: parseFloat(fila.total),
    }));

  if (ventasFiltradas.length === 0) {
    throw new Error("No hay ventas válidas para predecir");
  }

  return ventasFiltradas;
};
