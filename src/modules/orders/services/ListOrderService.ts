import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { IOrderPaginate } from '../domain/models/IOrderPaginate';

interface SearchParams {
  page: number;
  limit: number;
  full?: boolean; // Adicionado como opcional
}

@injectable()
class ListOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ page, limit, full }: SearchParams): Promise<IOrderPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    // Repassamos o parâmetro 'full' para o repositório decidir se faz os joins
    const orders = await this.ordersRepository.findAll({
      page,
      skip,
      take,
      full,
    });

    return orders;
  }
}

export default ListOrderService;
