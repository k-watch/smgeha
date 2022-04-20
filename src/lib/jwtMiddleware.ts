import { request } from 'express';
import jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies['access_token'];
  if (!token) return next(); // 토큰이 없음

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      userId: decoded.userId,
      username: decoded.username,
    };
    // 토큰의 남은 유효 기간이 3.5일 미만이면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await getConnection()
        .getRepository(User)
        .findOne({ where: { id: decoded.id } });
      const token = jwt.sign(
        {
          jti: user.id,
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
    }
    return next();
  } catch (e) {
    // 토큰 검증 실패
    return next();
  }
};

export default jwtMiddleware;
