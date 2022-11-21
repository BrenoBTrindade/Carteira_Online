import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

const loginSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: joiPassword.string()
    .minOfUppercase(1)
    .min(8)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required(),
});

const loginValidate = (req:Request, res:Response, next:NextFunction) => {
  const validate = loginSchema.validate(req.body);
  const { error } = validate;
  if (error) return res.status(400).json({ message: 'All fields must be filled' });
  next();
};

export default loginValidate;
