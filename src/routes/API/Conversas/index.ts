import {Router} from 'express';
import {listarConversas} from './Conversas';

const router = Router();
router.post('/', listarConversas);

export default router;
