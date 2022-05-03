import { EntityRepository, getConnection, Repository } from 'typeorm';
import { User } from '../entity/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findById = async (userId: string) => {
    const user = await getConnection()
      .getRepository(User)
      .findOne({ where: { userId } });
    return user;
  };
}
