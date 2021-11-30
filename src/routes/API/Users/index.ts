import { Router } from 'express';
import {getAllUsers, addOneUser, updateOneUser, deleteOneUser} from './Users';

const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.post('/add', addOneUser);
userRouter.put('/update', updateOneUser);
userRouter.delete('/delete/:id', deleteOneUser);

export default userRouter;
