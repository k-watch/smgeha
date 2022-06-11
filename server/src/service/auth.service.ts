import { User } from '../entity/User';
import { UserRepository } from '../repository/userRepository';
import bcrypt from 'bcrypt';
import { getCustomRepository } from 'typeorm';

export const register = async ({ userId, password, name }: User) => {
  const user = new User();
  user.userId = userId;
  user.password = await bcrypt.hash(password, 10);
  user.name = name;

  // 아이디 중복 체크
  const exists = await getCustomRepository(UserRepository).findById(userId);

  if (exists) {
    return null;
  }

  try {
    const result = await getCustomRepository(UserRepository).save(user);

    return result;
  } catch (e) {
    throw Error(e);
  }
};

export const login = async ({ userId, password }: User) => {
  const user = await getCustomRepository(UserRepository).findOne({
    where: { userId },
  });

  if (!user) {
    return null;
  }

  // 비밀번호 체크
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return null;
  }

  return user;
};
