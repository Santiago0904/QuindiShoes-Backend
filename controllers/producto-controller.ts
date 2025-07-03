  import { Request, Response } from "express";
  import ProductoServices from "../services/ModuloProductos/ProductoServices";
  import Producto from "../Dto/ProductoDto";
  import ProductoRepository from "../repositories/ModuloProductos/ProductoRepository";

  // ✅ REGISTRAR PRODUCTO
const registrarProducto = async (req: Request, res: Response) => {
    try {
      const {
        tipoProducto,
        nombreProducto,
        generoProducto,
        stockProducto,
        tallaProducto,
        precioProducto,
        colorProducto,
        imagenProducto,
      } = req.body;

      // Crear DTO
      const nuevoProducto = new Producto(
        tipoProducto,
        nombreProducto,
        generoProducto,
        stockProducto,
        tallaProducto,
        precioProducto,
        colorProducto,
        imagenProducto
      );

      // Insertamos el producto en la base de datos
      const productoInsertado = await ProductoRepository.registrarProducto(nuevoProducto);

      // Si el producto se inserta correctamente, obtenemos su ID
      // productoInsertado is likely [result, fields], where result.insertId is the new ID
      const productoId = (productoInsertado[0] as any).insertId;

    // Insertar variante (asumiendo que talla y color son valores únicos, no arrays)
    await ProductoRepository.registrarVariante({
      id_producto: productoId,
      id_talla: tallaProducto,
      id_color: colorProducto,
      stock: stockProducto,
    });

    // Insertar imagen (si viene)
    if (imagenProducto) {
      await ProductoRepository.registrarImagen({
        id_producto: productoId,
        url_imagen: imagenProducto,
      });
    }

      res.status(201).json({ message: "Producto registrado con éxito", id_producto: productoId });
    } catch (error) {
      console.error("Error al registrar producto:", error);
      res.status(500).json({ error: "Error al registrar producto" });
    }
  };

// ✅ OBTENER TODOS LOS PRODUCTOS
  export const obtenerProductos = async (req: Request, res: Response) => {
    try {
      const productos = await ProductoServices.obtenerProductos();
      res.json(productos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ error: "Error al obtener productos" });
    }
  };
  
// ✅ ELIMINAR UN PRODUCTO
  export const eliminarProducto = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await ProductoServices.eliminarProducto(Number(id));
      res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      res.status(500).json({ error: "Error al eliminar producto" });
    }
  };

    // ✅ OBTENER TALLAS
  export const obtenerTallas = async (_req: Request, res: Response) => {
    try {
      const tallas = await ProductoRepository.obtenerTallas();
      res.json(tallas);
    } catch (error) {
      console.error("Error al obtener tallas:", error);
      res.status(500).json({ error: "Error al obtener tallas" });
    }
  };

// ✅ OBTENER COLORES
  export const obtenerColores = async (_req: Request, res: Response) => {
    try {
      const colores = await ProductoRepository.obtenerColores();
      res.json(colores);
    } catch (error) {
      console.error("Error al obtener colores:", error);
      res.status(500).json({ error: "Error al obtener colores" });
    }
  };

// ✅ OBTENER DETALLE DE PRODUCTO POR ID
  export const obtenerDetalleProducto = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
        const productos = await ProductoRepository.obtenerTodos();
      const producto = productos.find((p: any) => p.id_producto === id);

      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      // Extraer tallas y colores únicos
      const colores = [
        ...new Map(
          producto.variantes.map((v: any) => [
            v.id_color,
            { id_color: v.id_color, color: v.color, codigo_hex: v.codigo_hex },
          ])
        ).values(),
      ];

      const tallas = [
        ...new Map(
          producto.variantes.map((v: any) => [
          v.id_talla,
          { id_talla: v.id_talla, talla: v.talla },
        ])
        ).values(),
      ];

      res.json({
        id_producto: producto.id_producto,
        tipo_producto: producto.tipo_producto,
        nombre_producto: producto.nombre_producto,
        reseña_producto: producto.reseña_producto,
        genero_producto: producto.genero_producto,
        precio_producto: producto.precio_producto,
        imagenes: producto.imagenes,
        colores,
        tallas,
        variantes: producto.variantes,
        reserva_activa: producto.reserva_activa,
      personalizacion_activa: producto.personalizacion_activa, // <-- asegúrate de incluir esta línea
      });
    } catch (error) {
      console.error("Error al obtener detalle del producto:", error);
      res.status(500).json({ error: "Error al obtener detalle del producto" });
    }
  }

// ✅ REGISTRAR UN COLOR
  export const registrarColor = async (req: Request, res: Response) => {
    try {
      const { color, codigo_hex } = req.body;
      if (!color || !codigo_hex) {
        return res.status(400).json({ error: "Faltan datos del color" });
      }

      const id = await ProductoRepository.registrarColor({ color, codigo_hex });
      res.status(201).json({ id, color, codigo_hex });
    } catch (error) {
      console.error("Error al registrar color:", error);
      res.status(500).json({ error: "Error al registrar color" });
    }
  };

  export const obtenerProductosFiltrados = async (req: Request, res: Response) => {
    try {
      const filtros = req.query;  // ← vienen del frontend por query string
      const productos = await ProductoServices.obtenerProductosFiltrados(filtros);
      res.json(productos);
    } catch (error) {
      console.error("Error al obtener productos filtrados:", error);
      res.status(500).json({ error: "Error al obtener productos filtrados" });
    }
  };  


// ✅ EXPORTAR REGISTRO PRINCIPAL PARA RUTA
  export default registrarProducto;
