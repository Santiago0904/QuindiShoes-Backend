import { Router } from 'express';
import ResenaController from '../controllers/ReseñaController';

const router = Router();

router.post('/agregar', ResenaController.agregarResena);
router.put('/editar', ResenaController.editarResena);
router.delete('/eliminar', ResenaController.eliminarResena);
router.get('/todas', ResenaController.obtenerTodasLasResenas);

export default router;
