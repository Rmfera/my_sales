import { Customer } from "../database/entities/Customer";
import { customerRespository } from "../database/repositories/CustomerRepositories";

export default class ListCustomerService {
  async execute(): Promise<Customer[]> {
    const customers = customerRespository.find();
    return customers;
  }
}
