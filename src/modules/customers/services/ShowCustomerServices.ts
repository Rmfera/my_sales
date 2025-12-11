import AppError from "@shared/errors/AppErrors";
import { customerRespository } from "../database/repositories/CustomerRepositories";
import { Customer } from "../database/entities/Customer";

interface IShowCustomer {
  id: number;
}

export default class ShowCustomerService {
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await customerRespository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }

    return customer;
  }
}
