import express from 'express';
import reiniciarContraseña from '../controllers/reiniciar-contraseña-controller';

const router = express.Router();

router.post('/', reiniciarContraseña);

export default router;