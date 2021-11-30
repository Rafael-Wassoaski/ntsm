import { Router } from 'express';
import Users from './Users/index';

const apiRouter = Router();
apiRouter.use('/users', Users);

export default apiRouter;
