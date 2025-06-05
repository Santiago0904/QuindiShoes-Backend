import express from 'express';
import obtenerInfoUsuario from '../controllers/profile-controller';
import { obtenerRecompensaJuego } from '../controllers/profile-controller';
import { renovarTokenMiddleware, verifyToken } from '../controllers/renovar-token-controller';
const router = express.Router();


router.get('/', verifyToken, renovarTokenMiddleware, obtenerInfoUsuario);
router.get('/recompensa', verifyToken, obtenerRecompensaJuego);


export default router;