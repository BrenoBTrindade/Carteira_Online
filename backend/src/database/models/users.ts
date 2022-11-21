import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;

  static associate(models:any) {
    Users.hasOne(models.Accounts, { foreignKey: 'accountId' });
  }
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  accountId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
