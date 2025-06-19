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

interface ActualizarReservaActivaRequestBody {
  activa: boolean;
}

interface ActualizarReservaActivaRequestParams {
  id: string;
}

export const actualizarReservaActiva = async (
  req: Request<ActualizarReservaActivaRequestParams, any, ActualizarReservaActivaRequestBody>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { activa } = req.body;
    if (typeof activa !== 'boolean') {
      return res.status(400).json({ mensaje: 'El campo activa debe ser booleano.' });
    }
    await ProductoServices.actualizarReservaActiva(Number(id), activa);
    res.json({ mensaje: `Reserva ${activa ? 'activada' : 'desactivada'} correctamente.` });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la reserva.' });
  }
};

export default actualizarProducto;