import AppError from "@shared/errors/AppErrors";

import { Customer } from "../infra/database/entities/Customer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";

interface IShowCustomer {
  id: number;
}

export default class ShowCustomerService {
  constructor(private readonly customerRepository: ICustomersRepository) {}
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }

    return customer;
  }
}
