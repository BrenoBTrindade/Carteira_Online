import * as bcrypt from 'bcryptjs';
import { Transaction } from 'sequelize/types';
import { Op } from 'sequelize';
import sequelize from '../database/models/index';
import Accounts from '../database/models/accounts';
import Users from '../database/models/users';
import { UserBody } from '../types/types';
import { createToken } from '../helpers/jtw';
import Transactions from '../database/models/transactions';

export default class UserService {
  static create = async (user: UserBody) => {
    const { username, password } = user;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const exist = await Users.findOne({ where: { username } });
    if (exist) return { code: 401, message: 'Usuario ja existe' };
    const newAccount = await Accounts.create({ balance: 100 });
    const newUser = await Users
      .create({ username, password: hash, accountId: newAccount.id });
    const token = createToken(
      { username: newUser.username, id: newUser.id, accountId: newUser.accountId },
    );
    return { code: 201, token };
  };

  static login = async (user: UserBody) => {
    const { username, password } = user;
    const getUser = await Users.findOne({ where: { username } });
    if (!getUser || getUser.username !== user.username) {
      return { code: 401, message: 'Incorrect username or password' };
    }
    const passwordCrypt = await bcrypt.compare(password, getUser.password);
    if (!passwordCrypt) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    const token = createToken(
      { username: getUser.username, id: getUser.id, accountId: getUser.accountId },
    );
    return { code: 200, token };
  };

  static getBalance = async (id: number) => {
    const balance = await Users.findOne({ where: { id },
      attributes: {
        exclude: ['id', 'username', 'password', 'accountId'],
      },
      include: [
        { model: Accounts,
          attributes: {
            include: ['balance'],
            exclude: ['id'],
          } },
      ] });
    return { code: 200, balance };
  };

  static cashOut = async (id: number, accountId:number, value: number, username: string) => {
    const creditedUser = await Users.findOne({ where: { username } });
    const debitedAccount = await Accounts.findOne({ where: { id: accountId } }) as Accounts;
    if (!creditedUser || !debitedAccount) return { code: 404, message: 'notFound' };
    const creditedAccount = await Accounts.findOne({ where: { id: creditedUser.accountId } });
    if (!creditedAccount) return { code: 404, message: 'notFound' };
    if (debitedAccount.balance < value) return { code: 400, message: 'Saldo insuficiente' };
    if (creditedUser.id === id) return { code: 400, message: 'erro na transação' };
    const debited = debitedAccount.balance - value;
    const credited = value + creditedAccount.balance;
    const result = await sequelize.transaction(async (t: Transaction) => {
      await Accounts
        .update({ balance: debited }, { where: { id }, transaction: t });
      await Accounts
        .update({ balance: credited }, { where: { id: creditedAccount.id }, transaction: t });
      return Transactions
        .create({ debitedAccountId: accountId, creditedAccountId: creditedUser.accountId, value });
    });
    return { code: 200, tramsactionId: result.id };
  };

  static getTransactions = async (id: number) => {
    const { accountId } = await Users.findOne({ where: { id } }) as Users;
    const getAllTransactions = await Transactions
      .findAll({ where:
         { [Op.or]: [{ debitedAccountId: accountId }, { creditedAccountId: accountId }] } });
    return { code: 200, data: getAllTransactions };
  };

  static getTransactionsByDate = async (id: number, date: string) => {
    const { accountId } = await Users.findOne({ where: { id } }) as Users;
    const getAllTransactions = await Transactions
      .findAll({ where:
         { [Op.or]: [{ debitedAccountId: accountId }, { creditedAccountId: accountId }],
           [Op.and]: [{ createdAt: date }] } });
    return { code: 200, data: getAllTransactions };
  };

  static getTransactionsByCashOut = async (accountId: number) => {
    const getAllTransactions = await Transactions
      .findAll({ where: { debitedAccountId: accountId } });
    return { code: 200, data: getAllTransactions };
  };

  static getTransactionsByCashIn = async (accountId: number) => {
    const getAllTransactions = await Transactions
      .findAll({ where: { creditedAccountId: accountId } });
    return { code: 200, data: getAllTransactions };
  };
}
