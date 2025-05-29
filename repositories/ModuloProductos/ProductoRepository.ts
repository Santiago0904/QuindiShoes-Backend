import db from '../../config/config-db';
import Producto from '../../Dto/ProductoDto';

class ProductoRepository {
static async registrarProducto(producto: Producto) {
  // Aquí realizarías la inserción en la tabla productos
  const result = await db.query(`
    INSERT INTO productos (tipo_producto, nombre_producto, genero_producto, precio_producto)
    VALUES (?, ?, ?, ?)`, [
    producto.tipoProducto,
    producto.nombreProducto,
    producto.generoProducto,
    producto.precioProducto
  ]);
  return result;  // Retorna el producto insertado, incluyendo el id_producto
}

static async registrarVariante(variante: { id_producto: any; id_talla: any; id_color: any; stock: any; }) {
  await db.query(`
    INSERT INTO producto_variantes (id_producto, id_talla, id_color, stock)
    VALUES (?, ?, ?, ?)`, [
    variante.id_producto,
    variante.id_talla,
    variante.id_color,
    variante.stock
  ]);
}

static async registrarImagen(imagen: { id_producto: any; url_imagen: any; }) {
  await db.query(`
    INSERT INTO imagenes (id_producto, url_imagen)
    VALUES (?, ?)`, [
    imagen.id_producto,
    imagen.url_imagen
  ]);
}

static async obtenerColores() {
  try {
   
    const result = await db.query('SELECT * FROM colores_producto');
    return result;  
  } catch (error) {
    console.error("Error al obtener los colores:", error);
    throw error;  
  }
}


 

static async obtenerTallas () {
  try {
    const result = await db.query('SELECT * FROM tallas');
    return result; 
  } catch (error) {
    console.error("Error al obtener las tallas:", error);
    throw error;  

  }
};



  static async obtenerTodos() {
  // Trae productos con variantes (talla, color, stock) e imágenes
  const result = await db.query(`
    SELECT 
      p.id_producto,
      p.tipo_producto,
      p.nombre_producto,
      p.reseña_producto,
      p.genero_producto,
      p.precio_producto,
      i.url_imagen,
      v.id_variantes,
      v.stock,
      t.id_talla,
      t.talla,
      c.id_color,
      c.color,
      c.codigo_hex       
    FROM productos p
    LEFT JOIN producto_variantes v ON p.id_producto = v.id_producto
    LEFT JOIN tallas t ON v.id_talla = t.id_talla
    LEFT JOIN colores_producto c ON v.id_color = c.id_color
    LEFT JOIN imagenes i ON p.id_producto = i.id_producto
    ORDER BY p.id_producto
  `);

  type ProductoRow = {
    id_producto: number;
    tipo_producto: string;
    nombre_producto: string;
    reseña_producto: string;
    genero_producto: string;
    precio_producto: number;
    url_imagen: string | null;
    id_variantes: number | null;
    stock: number | null;
    id_talla: number | null;
    talla: string | null;
    id_color: number | null;
    color: string | null;
    codigo_hex: string | null;
  };

  let rows: ProductoRow[] = [];
  if (Array.isArray(result)) {
    if (Array.isArray(result[0])) {
      // e.g., [RowDataPacket[], ...]
      rows = result[0] as ProductoRow[];
    } else if (result.length > 0 && typeof result[0] === 'object' && 'id_producto' in result[0]) {
      // e.g., RowDataPacket[]
      rows = result as unknown as ProductoRow[];
    }
    // else: result might be OkPacket[] or ResultSetHeader[], which we ignore for this query
  }

  // Agrupa por producto
  const productosMap: { [key: string]: any } = {};

  for (const row of rows) {
    if (!productosMap[row.id_producto]) {
      productosMap[row.id_producto] = {
        id_producto: row.id_producto,
        tipo_producto: row.tipo_producto,
        nombre_producto: row.nombre_producto,
        reseña_producto: row.reseña_producto,
        genero_producto: row.genero_producto,
        precio_producto: row.precio_producto,
        imagenes: [],
        variantes: [],
      };
    }

    // Agrega imagen si no está repetida y existe
    if (row.url_imagen && !productosMap[row.id_producto].imagenes.includes(row.url_imagen)) {
      productosMap[row.id_producto].imagenes.push(row.url_imagen);
    }

    // Agrega variante si existe talla y color
    if (row.id_talla && row.id_color) {
      productosMap[row.id_producto].variantes.push({
        id_variantes: row.id_variantes,
        id_talla: row.id_talla,
        talla: row.talla,
        id_color: row.id_color,
        color: row.color,
        codigo_hex: row.codigo_hex, 
        stock: row.stock,
      });
    }
  }

  // Devuelve un array de productos
  return Object.values(productosMap);
}

  // Elimina el producto y sus variantes e imágenes (recomendado para integridad referencial)
static async eliminarProducto(id: number) {
  // Elimina variantes e imágenes primero si tienes claves foráneas
  await db.execute('DELETE FROM producto_variantes WHERE id_producto = ?', [id]);
  await db.execute('DELETE FROM imagenes WHERE id_producto = ?', [id]);
  // Luego elimina el producto
  await db.execute('DELETE FROM productos WHERE id_producto = ?', [id]);
}

  static async ActualizarProducto(producto: Producto, id: number) {
  const sql = `
    UPDATE productos SET 
      tipo_producto = ?,
      nombre_producto = ?,
      genero_producto = ?,
      precio_producto = ?
    WHERE id_producto = ?
  `;
  const values = [
    producto.tipoProducto,
    producto.nombreProducto,
    producto.generoProducto,
    producto.precioProducto,
    id
  ];
  return await db.execute(sql, values);
}

static async registrarColor(color: { color: string, codigo_hex: string }) {
  // Inserta un nuevo color y retorna el id insertado
  const [result]: any = await db.query(
    `INSERT INTO colores_producto (color, codigo_hex) VALUES (?, ?)`,
    [color.color, color.codigo_hex]
  );
  return result.insertId;
}

// Obtener variantes de un producto
static async obtenerVariantesPorProducto(id_producto: number) {
  const [rows]: any = await db.query(
    `SELECT v.id_variantes, v.id_producto, v.id_talla, t.talla, v.id_color, c.color, c.codigo_hex, v.stock
     FROM producto_variantes v
     JOIN tallas t ON v.id_talla = t.id_talla
     JOIN colores_producto c ON v.id_color = c.id_color
     WHERE v.id_producto = ?`,
    [id_producto]
  );
  return rows;
}

// Actualizar variante
static async actualizarVariante(id_variante: number, data: { id_talla: number, id_color: number, stock: number }) {
  await db.query(
    `UPDATE producto_variantes SET id_talla = ?, id_color = ?, stock = ? WHERE id_variantes = ?`,
    [data.id_talla, data.id_color, data.stock, id_variante]
  );
}

// Eliminar variante
static async eliminarVariante(id_variante: number) {
  await db.query(
    `DELETE FROM producto_variantes WHERE id_variantes = ?`,
    [id_variante]
  );
}
}

export default ProductoRepository;
