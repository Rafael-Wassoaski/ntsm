import {Router} from 'express';
import {listarConversas} from './Conversas';

const router = Router();
router.get('/', listarConversas);

export default router;
