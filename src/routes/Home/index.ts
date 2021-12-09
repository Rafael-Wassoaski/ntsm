import {index, signIn} from './Home';
import { Router } from 'express';

const homeRouter= Router();
homeRouter.get('/', index);
homeRouter.get('/signIn', signIn);

export default homeRouter;