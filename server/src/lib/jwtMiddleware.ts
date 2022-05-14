import jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies['auth_token'];
  // 토큰이 없음
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      userId: decoded.userId,
      name: decoded.name,
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
    }
    return next();
  } catch (e) {
    // 토큰 검증 실패
    return next();
  }
};

export default jwtMiddleware;
