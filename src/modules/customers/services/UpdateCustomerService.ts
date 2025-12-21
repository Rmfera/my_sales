import AppError from "@shared/errors/AppErrors";
import { Customer } from "../infra/database/entities/Customer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";

interface IUpdateCustomer {
  id: number;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  constructor(private readonly customerRepository: ICustomersRepository) {}
  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }

    const customerExists = await this.customerRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError("There is already one customer with this email.",409);
    }

    customer.name = name;
    customer.email = email;

    await this.customerRepository.save(customer);

    return customer;
  }
}
