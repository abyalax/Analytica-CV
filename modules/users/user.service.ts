import { Prisma } from '~/generated/prisma/client';
import { Service } from '../base/services';
import { UserRepository } from './user.repository';

class UserService extends Service<UserRepository> {
  constructor() {
    super(new UserRepository());
  }

  paginateUsers(page: number, per_page: number) {
    return this.repository.paginate({
      page,
      per_page,
    });
  }

  findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  findUser(where: Prisma.usersWhereUniqueInput) {
    return this.repository.findWithRolesAndPermissions(where);
  }

  create(data: Prisma.usersCreateInput) {
    return this.repository.create(data);
  }
}

export const userService = new UserService();
