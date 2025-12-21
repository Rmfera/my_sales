import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepositories";
import customerRepository from "@modules/customers/infra/database/repositories/CustomerRepositories";

import { container } from "tsyringe";

container.registerSingleton<ICustomersRepository>(
  'CustomerRepository',
  customerRepository,
);

// container.registerSingleton<IProductsRepository>(
//   'ProductsRepository',
//   ProductsRepository,
// );

// // container.registerSingleton<IOrdersRepository>(
// //   'OrdersRepository',
// //   OrdersRepository,
// // );

// container.registerSingleton<IUsersRepository>(
//   'UsersRepository',
//   UsersRepository,
// );

// container.registerSingleton<IUserTokensRepository>(
//   'UserTokensRepository',
//   UserTokensRepository,
// );
