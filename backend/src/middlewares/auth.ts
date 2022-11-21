import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

const Auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || 'secret';

    if (!token) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    const valid = verify(token, secret) as JwtPayload;

    req.body.user = valid;

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default Auth;
