import { Router } from 'express';
import API from './API/index';
import Home from './Home/index';

// Export the base-router
const baseRouter = Router();
baseRouter.use('/', Home);
baseRouter.use('/api/v1', API);
export default baseRouter;
