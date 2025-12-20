import AppError from "@shared/errors/AppErrors";
import { customerRepository } from "../infra/database/repositories/CustomerRepositories";
import { Customer } from "../infra/database/entities/Customer";

interface IShowCustomer {
  id: number;
}

export default class ShowCustomerService {
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }

    return customer;
  }
}
