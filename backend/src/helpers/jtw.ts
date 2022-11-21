import * as Jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET || 'secret';
const JWT_CONFIG: object = { algorithm: 'HS256', expiresIn: '1d' };

export const createToken = (payload: object) => {
  const token = Jwt.sign({ payload }, SECRET, JWT_CONFIG);
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = Jwt.verify(token, SECRET);
    return decoded;
  } catch (err) {
    return err;
  }
};
