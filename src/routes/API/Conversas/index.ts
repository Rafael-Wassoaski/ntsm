import {Router} from 'express';
import {listarConversas} from './Conversas';

const router = Router();
router.get('/', listarConversas);
router.post('/iniciarConversa/:userId', )

export default router;
