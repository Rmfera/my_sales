import AppError from "@shared/errors/AppErrors";
import { customerRespository } from "../database/repositories/CustomerRepositories";
import { Customer } from "../database/entities/Customer";

interface ICreateCustomer {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await customerRespository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email address already used.", 409);
    }

    const customer = customerRespository.create({
      name,
      email,
    });

    await customerRespository.save(customer);

    return customer;
  }
}
