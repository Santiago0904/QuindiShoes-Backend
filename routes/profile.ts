import express from 'express';
import obtenerInfoUsuario from '../controllers/profile-controller';
import { renovarTokenMiddleware, verifyToken } from '../controllers/renovar-token-controller';
const router = express.Router();


router.get('/', verifyToken, renovarTokenMiddleware, obtenerInfoUsuario);


export default router;  