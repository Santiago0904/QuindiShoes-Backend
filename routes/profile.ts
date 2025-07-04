import express from 'express';
import obtenerInfoUsuario from '../controllers/profile-controller';
import { obtenerRecompensaJuego } from '../controllers/profile-controller';
import { renovarTokenMiddleware, verifyToken } from '../controllers/renovar-token-controller';
import { editarUsuario } from '../controllers/profile-controller';
const router = express.Router();


router.get('/', obtenerInfoUsuario);
router.get('/recompensa', verifyToken, obtenerRecompensaJuego);
router.put("/:id", editarUsuario);


export default router;