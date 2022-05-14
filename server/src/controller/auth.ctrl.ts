import Joi from 'joi';
import jwt from 'jsonwebtoken';
import * as authService from '../service/auth.service';

/*
  POST /api/auth/register
  {
    userId: string,
    name: string,
    password: string
  }
*/
export const register = async (req, res) => {
  const schema = Joi.object().keys({
    userId: Joi.string().required(),
    name: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const validate = schema.validate(req.body);
  if (validate.error) {
    res.status(400).send({ status: 400, msg: validate.error });
    return;
  }

  try {
    const result = await authService.register(req.body);

    if (!result) {
      res.status(409).send({ status: 409, msg: 'Confilt Auth' });
      return;
    }
  } catch (e) {
    res.status(500).send({ status: 500, msg: e.message });
    return;
  }

  res.send();
};

/*
  POST /api/auth/login
  {
    userId: string
    password: string
  }
*/
export const login = async (req, res) => {
  const user = await authService.login(req.body);

  if (!user) {
    return res.status(401).send({ status: 401, msg: 'Invalid Id or Password' });
  }

  const token = jwt.sign(
    {
      id: user.id,
      userId: user.userId,
      name: user.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );

  res.cookie('auth_token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });

  res.send({ userId: user.userId, name: user.name });
};

/*
  GET /api/auth/check
*/
export const check = async (req, res) => {
  const user = req.user;
  if (!user) {
    // 로그인 중 아님
    res.status(401).send({ status: 401, msg: 'Not Login' });
    return;
  }
  res.send(user);
};

/*
  POST /api/auth/logout
*/
export const logout = async (req, res) => {
  res.clearCookie('auth_token').send();
};
