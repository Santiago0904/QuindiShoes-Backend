import { Router } from 'express';
import { agregarResena, obtenerResenasPorProducto, eliminarResena, actualizarResena } from '../controllers/ResenaProductoController';

const router = Router();

router.post('/agregar', agregarResena);
router.get('/producto/:id_producto', obtenerResenasPorProducto);
router.delete('/eliminar', eliminarResena);
router.put('/actualizar', actualizarResena);

export default router;