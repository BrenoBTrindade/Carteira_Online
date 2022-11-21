import { Router } from 'express';
import loginValidate from '../middlewares/loginValidate';
import UserController from '../controller/user';
import Auth from '../middlewares/auth';

const userRouter = Router();

userRouter.post('/register', loginValidate, UserController.create);
userRouter.post('/login', loginValidate, UserController.login);
userRouter.get('/balance', Auth, UserController.getBalance);
userRouter.put('/cashout', Auth, UserController.cashOut);
userRouter.get('/transactions', Auth, UserController.getTransactions);
userRouter.get('/transactions/date', Auth, UserController.getTransactionsByDate);
userRouter.get('/transactionsbycashout', Auth, UserController.getTransactionsByCashOut);
userRouter.get('/transactionsbycashin', Auth, UserController.getTransactionsByCashIn);

export default userRouter;
