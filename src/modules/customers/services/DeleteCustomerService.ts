import AppError from "@shared/errors/AppErrors";
import { customerRespository } from "../database/repositories/CustomerRepositories";

interface IDeleteCustomer {
  id: number;
}

export default class DeleteCustomerService {
  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await customerRespository.findById(id);
    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }
    await customerRespository.remove(customer);
  }
}
