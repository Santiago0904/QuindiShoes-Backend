import { Request, Response } from "express";
import ProductoServices from "../services/ModuloProductos/ProductoServices";
import { sendProductsToIA } from "../services/ModuloIA/iaProductService";

const enviarProductosAI = async (req: Request, res: Response) => {
  try {
    // Se consulta la información de productos de la base de datos
    const products = await ProductoServices.obtenerProductos();

    // Se envían los productos al microservicio de IA
    const iaResponse = await sendProductsToIA(products);

    // Se responde con la respuesta de la IA
    return res.status(200).json({ message: "Datos enviados a la IA", iaResponse });
  } catch (error: any) {
    console.error("Error en enviarProductosAI:", error);
    return res.status(500).json({ error: "Error al enviar productos a la IA" });
  }
};

export default enviarProductosAI;