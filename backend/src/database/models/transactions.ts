import { DECIMAL, DATE, INTEGER, Model, DataTypes } from 'sequelize';
import db from '.';
import Accounts from './accounts';

class Transactions extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId: number;
  value: number;
  createdAt: string;
}

Transactions.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
  value: {
    type: DECIMAL,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
});

Transactions.belongsTo(Accounts, { foreignKey: 'debitedAccountId', as: 'debitedAccount' });
Transactions.belongsTo(Accounts, { foreignKey: 'creditedAccountId', as: 'creditedAccount' });

Accounts.hasMany(Transactions, { foreignKey: 'debitedAccountId', as: 'debited' });
Accounts.hasMany(Transactions, { foreignKey: 'creditedAccountId', as: 'credited' });

export default Transactions;
