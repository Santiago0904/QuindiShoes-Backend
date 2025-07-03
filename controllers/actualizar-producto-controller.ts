import { Request, Response } from "express";
import ProductoServices from "../services/ModuloProductos/ProductoServices";
import Producto from "../Dto/ProductoDto";


const actualizarProducto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const {
      tipoProducto,
      nombreProducto,
      generoProducto,
      precioProducto,
      imagenUrl
    } = req.body;

    const producto = new Producto(
      tipoProducto,
      nombreProducto,
      generoProducto,
      0,
      '',
      precioProducto,
      '',
      ''
    );

    await ProductoServices.actualizarProducto(producto, id);

    // ✅ Nueva lógica para imagen
    if (imagenUrl && typeof imagenUrl === "string" && imagenUrl.trim() !== "") {
      await ProductoServices.actualizarImagen(id, imagenUrl);
    }

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

// ejemplo de controlador
export const actualizarPersonalizacionActiva = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // <-- debe existir
    const { personalizacion_activa } = req.body; // <-- debe existir

    if (typeof personalizacion_activa === "undefined" || !id) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    // Llama a tu repositorio aquí
    await ProductoServices.actualizarPersonalizacionActiva(id, personalizacion_activa);

    res.json({ message: "Personalización actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar personalización" });
  }
};

export default actualizarProducto;