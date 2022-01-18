import {Router} from 'express';
import { iniciarConversa, listarConversas, newMessage } from './Conversas';

const router = Router();
router.get('/', listarConversas);
router.post('/iniciarConversa/:userId', iniciarConversa);
router.post('/newMessage/:userId', newMessage);

export default router;
