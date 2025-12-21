import AppError from "@shared/errors/AppErrors";
import { Customer } from "../infra/database/entities/Customer";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";

export default class CreateCustomerService {
  constructor(private readonly customerRepository: ICustomersRepository) {}
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await this.customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email address already used.", 409);
    }

    const customer = await this.customerRepository.create({
      name,
      email,
    });

    return customer;
  }
}
