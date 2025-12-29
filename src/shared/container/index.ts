import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepositories";
import customerRepository from "@modules/customers/infra/database/repositories/CustomerRepositories";
import { IUsersRepository } from "@modules/users/domain/repositories/IUserRepositories";
import UsersRepository from "@modules/users/infra/database/repositories/UsersRepository";

import { container } from "tsyringe";

container.registerSingleton<ICustomersRepository>(
  'CustomerRepository',
  customerRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);


