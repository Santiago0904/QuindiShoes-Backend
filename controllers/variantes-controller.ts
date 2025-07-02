import { Request, Response } from "express";
import ProductoRepository from "../repositories/ModuloProductos/ProductoRepository";
import ImagenServices from "../services/ModuloProductos/ImagenServices";

export const subirImagenProducto = async (req: Request, res: Response) => {
  try {
    const { id_producto } = req.body;
    const imagen = req.file?.filename;

    if (!imagen) {
      return res.status(400).json({ error: "No se envió imagen" });
    }

    const urlImagen = `/uploads/imagenes_productos/${imagen}`;

    await ImagenServices.guardarImagen(Number(id_producto), urlImagen);

    res.status(201).json({
      message: "Imagen subida correctamente",
      url: urlImagen
    });
  } catch (error) {
    console.error("❌ Error al subir imagen:", error);
    res.status(500).json({ error: "Error al subir imagen" });
  }
};
// Obtener todas las variantes de un producto
export const obtenerVariantesPorProducto = async (req: Request, res: Response) => {
  try {
    const { id_producto } = req.params;
    const variantes = await ProductoRepository.obtenerVariantesPorProducto(Number(id_producto));
    res.json(variantes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener variantes" });
  }
};

// Eliminar una variante
export const eliminarVariante = async (req: Request, res: Response) => {
  try {
    const { id_variante } = req.params;
    await ProductoRepository.eliminarVariante(Number(id_variante));
    res.json({ message: "Variante eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar variante" });
  }
};

// Actualizar una variante
export const actualizarVariante = async (req: Request, res: Response) => {
  try {
    const { id_variante } = req.params;
    const { id_talla, id_color, stock } = req.body;
    await ProductoRepository.actualizarVariante(Number(id_variante), { id_talla, id_color, stock });
    res.json({ message: "Variante actualizada" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar variante" });
  }
};

// Crear una nueva variante
export const crearVariante = async (req: Request, res: Response) => {
  try {
    const { id_producto, id_talla, id_color, stock } = req.body;
    await ProductoRepository.registrarVariante({ id_producto, id_talla, id_color, stock });
    res.status(201).json({ message: "Variante creada" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear variante" });
  }
};