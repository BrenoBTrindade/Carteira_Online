import { INTEGER, Model } from 'sequelize';
import db from '.';
import Users from './users';

class Accounts extends Model {
  id!: number;
  balance!: number;
}

Accounts.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
});

Accounts.hasOne(Users, { foreignKey: 'accountId' });
Users.belongsTo(Accounts, { foreignKey: 'accountId' });

export default Accounts;
