
import { ICustomersRepository } from '../domain/repositories/ICustomersRepositories';
import { inject, injectable } from 'tsyringe';
import { IShowCustomer } from '../domain/models/IShowCustomer';
import AppError from '@shared/errors/AppErrors';


@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    await this.customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
