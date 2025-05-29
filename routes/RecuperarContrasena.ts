import express from 'express';
import RecuperarContraseñaController from '../controllers/Recuperar-contraseña-controller';

const router = express.Router();

router.post('/', RecuperarContraseñaController);

export default router;