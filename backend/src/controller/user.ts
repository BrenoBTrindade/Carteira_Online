import { Request, Response } from 'express';
import UserService from '../services/user';

export default class UserController {
  static create = async (req: Request, res: Response) => {
    const { code, message, token } = await UserService.create(req.body);
    if (message) return res.status(code).json({ message });
    return res.status(code).json({ token });
  };

  static login = async (req: Request, res: Response) => {
    const { code, message, token } = await UserService.login(req.body);
    if (message) return res.status(code).json({ message });
    return res.status(code).json({ token });
  };

  static getBalance = async (req: Request, res: Response) => {
    const { payload: { id } } = req.body.user;
    const { code, balance } = await UserService.getBalance(id);
    return res.status(code).json(balance);
  };

  static cashOut = async (req: Request, res: Response) => {
    const { payload: { id, accountId } } = req.body.user;
    const { value, username } = req.body;
    const { code, message, tramsactionId } = await UserService
      .cashOut(Number(id), Number(accountId), Number(value), username);
    if (message) res.status(code).json({ message });
    return res.status(code).json({ tramsactionId });
  };

  static getTransactions = async (req: Request, res: Response) => {
    const { payload: { id } } = req.body.user;
    const { code, data } = await UserService.getTransactions(+id);
    return res.status(code).json(data);
  };

  static getTransactionsByDate = async (req: Request, res: Response) => {
    const { payload: { id } } = req.body.user;
    const { date } = req.query;
    const parsedQuery = JSON.stringify(date);
    if (!date) res.status(400).json('badRequest');
    const { code, data } = await UserService.getTransactionsByDate(+id, parsedQuery);
    return res.status(code).json(data);
  };

  static getTransactionsByCashOut = async (req: Request, res: Response) => {
    const { payload: { accountId } } = req.body.user;
    const { code, data } = await UserService.getTransactionsByCashOut(+accountId);
    return res.status(code).json(data);
  };

  static getTransactionsByCashIn = async (req: Request, res: Response) => {
    const { payload: { accountId } } = req.body.user;
    const { code, data } = await UserService.getTransactionsByCashIn(+accountId);
    return res.status(code).json(data);
  };
}
