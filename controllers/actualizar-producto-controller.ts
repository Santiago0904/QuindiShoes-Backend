import { Request, Response } from "express";
import ProductoServices from "../services/ModuloProductos/ProductoServices";
import Producto from "../Dto/ProductoDto";

const actualizarProducto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    // Recibe solo los campos principales que realmente se actualizan
    const {
      tipoProducto,
      nombreProducto,
      generoProducto,
      precioProducto
    } = req.body;

    // Crea el DTO solo con los campos necesarios
    const producto = new Producto(
      tipoProducto,
      nombreProducto,
      generoProducto,
      0, // stockProducto
      '', // tallaProducto
      precioProducto,
      '', // colorProducto
      ''  // imagenProducto
    );

    await ProductoServices.actualizarProducto(producto, id);

    return res.status(200).json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return res.status(500).json({ error: "Error al actualizar producto" });
  }
};

export default actualizarProducto;