import { Router } from 'express';
import { getAllUsers, updateOneUser, deleteOneUser, login, createUser, addContato } from './Users';

const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.post('/add', createUser);
userRouter.put('/update', updateOneUser);
userRouter.delete('/delete/:id', deleteOneUser);
userRouter.post('/login', login);
userRouter.post('/newContact', addContato);

export default userRouter;
