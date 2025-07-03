import { Request, Response } from 'express';
import Materiales from '../Dto/MaterialesDto';
import PersonalizacionServices from '../services/ModuloPersonalizacion/PersonalizacionServices';
import { Request as ExpressRequest } from 'express';
import multer from 'multer';
import fs from 'fs';

// Configuración de multer para guardar archivos temporalmente
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/materiales'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
export const uploadMaterial = multer({ storage });

const addMaterial = async (
  req: ExpressRequest & { file?: Express.Multer.File }, res: Response
) => {
  console.log('Archivo recibido:', req.file);
  console.log('Datos del cuerpo:', req.body);
  try {
    const { nombre_material } = req.body;
    let material_img = null;

    if (req.file) {
      material_img = fs.readFileSync(req.file.path); // Buffer para la BD
      fs.unlinkSync(req.file.path); // Borra el archivo temporal
    }

    if (!nombre_material) {
      return res.status(400).json({ error: 'El nombre del material es requerido' });
    }

    const material_register = await PersonalizacionServices.addMateriales(
      new Materiales(nombre_material, material_img)
    );

    return res.status(201).json({ message: 'Material agregado exitosamente', material_register });
  } catch (error) {
    console.error('Error al agregar material:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const obtenerMateriales = async (req: Request, res: Response) => {
  try {
    const materiales = await PersonalizacionServices.obtenerMateriales();
    res.json(materiales);
  } catch (error) {
    console.error("Error al obtener materiales:", error);
    res.status(500).json({ error: "Error al obtener materiales" });
  }
};

export const eliminarMateriales = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await PersonalizacionServices.deleteMateriales(Number(id));
    res.status(200).json({ message: "Material eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar material:", error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};

export default addMaterial;