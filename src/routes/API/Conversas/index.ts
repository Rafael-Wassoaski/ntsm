import {Router} from 'express';
import {listarConversas} from './Conversas';

const router = Router();
router.get('/', listarConversas);
router.post('/iniciarConversa/:userId', )
router.post('/newMessage/:userId', )

export default router;
