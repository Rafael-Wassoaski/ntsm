import { Router } from 'express';
import API from './API/index';
import {index} from './Home';

// Export the base-router
const baseRouter = Router();
baseRouter.use('/api/v1', API);
baseRouter.get('/', index);
export default baseRouter;
