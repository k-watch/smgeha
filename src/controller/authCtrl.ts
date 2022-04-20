import Joi from 'joi';
import { DataTypeNotSupportedError, getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';

/*
  POST /api/auth/register
  {
    userId: 'abcd',
    username: 'abcd',
    password: '1234'
  }
*/
export const register = async (req, res) => {
  // Request Body 검증하기
  const schema = Joi.object().keys({
    userId: Joi.string().required(),
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const validate = schema.validate(req.body);
  if (validate.error) {
    return res.status(400).send(validate.error);
  }

  const { userId, password, username } = req.body;

  const user = new User();
  user.userId = userId;
  user.password = await bcrypt.hash(password, 10);
  user.username = username;

  // 이메일 중복 체크
  const exists = await getConnection()
    .getRepository(User)
    .findOne({ where: { userId } });

  if (exists) {
    return res.status(409).send();
  }

  try {
    await getConnection().getRepository(User).save(user);
  } catch (e) {
    res.status(500).send(e);
  }

  return res.send();
};

/*
  POST /api/auth/login
  {
    userId: 'abcd@abcd.com
    password: '1234'
  }
*/
export const login = async (req, res) => {
  const { userId, password } = req.body;

  const user = await getConnection()
    .getRepository(User)
    .findOne({ where: { userId } });

  if (!user) {
    return res.status(401).send();
  }

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return res.status(401).send();
  }

  const token = jwt.sign(
    {
      id: user.id,
      userId: user.userId,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );

  res.cookie('access_token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
    httpOnly: true,
  });

  return res.send({ userId: user.userId, username: user.username });
};

/*
  GET /api/auth/check
*/
export const check = async (req, res) => {
  const user = req.user;
  if (!user) {
    // 로그인 중 아님
    return res.status(401).send(); // Unauthorized
  }
  return res.send(user);
};

/*
  POST /api/auth/logout
*/
export const logout = async (req, res) => {
  return res.clearCookie('access_token').send();
};
