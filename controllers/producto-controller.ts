import { Request, Response } from "express";
import ProductoServices from "../services/ModuloProductos/ProductoServices";
import Producto from "../Dto/ProductoDto"; // Asegúrate de tener esta clase
import ProductoRepository from "../repositories/ModuloProductos/ProductoRepository";

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
      imagenProducto
    } = req.body;

    // Primero, creamos el producto
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

    // Ahora, insertamos las variantes para cada talla y color (podrían ser arrays)
    for (let talla of tallaProducto) {  // tallaProducto puede ser un array de IDs de tallas
      for (let color of colorProducto) { // colorProducto puede ser un array de IDs de colores
        await ProductoRepository.registrarVariante({
          id_producto: productoId,
          id_talla: talla,
          id_color: color,
          stock: stockProducto // Este puede ser el stock por variante o se puede definir diferente
        });
      }
    }

    // Si hay una imagen, la insertamos
    if (imagenProducto) {
      await ProductoRepository.registrarImagen({
        id_producto: productoId,
        url_imagen: imagenProducto
      });
    }

    res.status(201).json({ message: "Producto registrado con éxito" });
  } catch (error) {
    console.error("Error al registrar producto:", error);
    res.status(500).json({ error: "Error al registrar producto" });
  }
};

export const obtenerProductos = async (req: Request, res: Response) => {
    try {
      const productos = await ProductoServices.obtenerProductos();
      res.json(productos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ error: "Error al obtener productos" });
    }
  };
  
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

  
// En producto-controller.js

export const obtenerTallas = async (req: Request, res: Response) => {
  try {
    const tallas = await ProductoRepository.obtenerTallas(); // Un servicio para obtener las tallas
    res.json(tallas);
  } catch (error) {
    console.error("Error al obtener tallas:", error);
    res.status(500).json({ error: "Error al obtener tallas" });
  }
};

export const obtenerColores = async (req: Request, res: Response) => {
  try {
    const colores = await ProductoRepository.obtenerColores(); // Un servicio para obtener los colores
    res.json(colores);
  } catch (error) {
    console.error("Error al obtener colores:", error);
    res.status(500).json({ error: "Error al obtener colores" });
  }
};

export const obtenerDetalleProducto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    // Trae el producto con variantes e imágenes
    const productos = await ProductoRepository.obtenerTodos();
    const producto = productos.find((p: any) => p.id_producto === id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Extrae colores y tallas únicos de las variantes
    const colores = [
      ...new Map(
        producto.variantes.map((v: any) => [
          v.id_color,
          { id_color: v.id_color, color: v.color, codigo_hex: v.codigo_hex }
        ])
      ).values(),
    ];
    const tallas = [
      ...new Map(
        producto.variantes.map((v: any) => [v.id_talla, { id_talla: v.id_talla, talla: v.talla }])
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
    });
  } catch (error) {
    console.error("Error al obtener detalle del producto:", error);
    res.status(500).json({ error: "Error al obtener detalle del producto" });
  }
}

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

export default registrarProducto;
