import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepositories";
import CustomerRepository from "@modules/customers/infra/database/repositories/CustomerRepositories";
import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import OrdersRepository from "@modules/orders/infra/database/repositories/OrdersRepository";
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import ProductsRepository from "@modules/products/infra/database/repositories/ProductsRepository";

import { IUsersRepository } from "@modules/users/domain/repositories/IUserRepositories";
import { IUserTokensRepository } from "@modules/users/domain/repositories/IUserTokensRepository";
import UsersRepository from "@modules/users/infra/database/repositories/UsersRepository";
import UserTokensRepository from "@modules/users/infra/database/repositories/UserTokensRepository";

import { container } from "tsyringe";

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomerRepository
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);


