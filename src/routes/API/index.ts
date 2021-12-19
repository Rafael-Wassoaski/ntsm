import { Router } from 'express';
import Users from './Users/index';
import Conversas from './Conversas/index';

const apiRouter = Router();
apiRouter.use('/users', Users);
apiRouter.use('/conversas', Conversas);

export default apiRouter;
