import db from '../../config/config-db';
import { RowDataPacket } from "mysql2";

class CarritoRepository {
    static async obtenerItemCarrito(id_variantes: number) {
        const sql = `
            SELECT 
                p.id_producto,
                p.nombre_producto,
                p.tipo_producto,
                p.precio_producto,
                v.id_variantes,
                v.stock,
                t.id_talla,
                t.talla,
                c.id_color,
                c.color,
                i.url_imagen
            FROM productos p
            JOIN producto_variantes v ON p.id_producto = v.id_producto
            JOIN tallas t ON v.id_talla = t.id_talla
            JOIN colores_producto c ON v.id_color = c.id_color
            LEFT JOIN imagenes i ON p.id_producto = i.id_producto
            WHERE v.id_variantes = ?
            LIMIT 1
        `;
        const values = [id_variantes];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows[0];
    }
}

export default CarritoRepository;