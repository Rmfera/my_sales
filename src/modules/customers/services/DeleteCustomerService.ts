import AppError from "@shared/errors/AppErrors";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";

interface IDeleteCustomer {
  id: number;
}

export default class DeleteCustomerService {
   constructor(private readonly customerRepository: ICustomersRepository) {}
  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }
    await this.customerRepository.remove(customer);
  }
}
