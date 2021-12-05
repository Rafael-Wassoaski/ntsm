import { Router } from 'express';
import {getAllUsers, updateOneUser, deleteOneUser, login, signIn, createUser} from './Users';

const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.post('/add', createUser);
userRouter.get('/signIn', signIn);
userRouter.put('/update', updateOneUser);
userRouter.delete('/delete/:id', deleteOneUser);
userRouter.post('/login', login);

export default userRouter;
