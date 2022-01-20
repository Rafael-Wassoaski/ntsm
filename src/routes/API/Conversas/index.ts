import {Router} from 'express';
import { listarConversas, newMessage } from './Conversas';

const router = Router();
router.get('/:userId', listarConversas);
router.post('/newMessage/:userId', newMessage);

export default router;
