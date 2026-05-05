/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUsersRepository } from '../IUserRepositories';
import { IUser } from '../../models/IUser';
import { IPaginateUser } from '../../models/IPaginateUser';
import { ICreateUser } from '../../models/ICreateUser';
import { v4 as uuidv4 } from 'uuid';
import User from '@modules/users/infra/database/entities/User';

class FakeUserRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<IUser | null> {
    return (this.users.find(user => user.email === email) as IUser) || null;
  }

  public async create(userData: ICreateUser): Promise<IUser> {
    const user = new User();
    user.id = uuidv4();
    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;

    this.users.push(user);

    return user as IUser;
  }

  public async save(user: User): Promise<void> {
    const findIndex = this.users.findIndex(
      findUser => findUser.id === user.id,
    );

    if (findIndex !== -1) {
      this.users[findIndex] = user;
    } else {
      this.users.push(user);
    }
  }

  // IMPLEMENTADO: Agora ele faz a paginação de verdade para os testes
  public async findAll({
    page,
    skip,
    take,
  }: {
    page: number;
    skip: number;
    take: number;
  }): Promise<IPaginateUser> {
    // Simula o comportamento do banco (pula os X primeiros e pega os Y seguintes)
    const usersPage = this.users.slice(skip, skip + take);

    return {
      per_page: take,
      total: this.users.length,
      current_page: page,
      data: usersPage as IUser[],
    };
  }

  public async findByName(name: string): Promise<IUser | null> {
    const user = this.users.find(user => user.name === name);
    return (user as IUser) || null;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = this.users.find(user => user.id === id);
    return (user as IUser) || null;
  }
}

export default FakeUserRepository;
