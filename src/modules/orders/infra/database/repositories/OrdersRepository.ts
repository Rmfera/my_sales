import { Repository } from "typeorm";
import Order from "../entities/Order";
import { ICreateOrder } from "@modules/orders/domain/models/ICreateOrder";
import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import { IOrderPaginate } from "@modules/orders/domain/models/IOrderPaginate";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { IOrder } from "@modules/orders/domain/models/IOrder";

type SearchParams = {
  page: number;
  skip: number;
  take: number;
  full?: boolean; // Adicionamos aqui
};

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Order);
  }

  public async findById(id: string): Promise<IOrder | null> {
    const order = this.ormRepository.findOne({
      where: { id },
      relations: ["order_products", "customer"],
    });

    return order;
  }

  public async findAll({
    page,
    skip,
    take,
    full,
  }: SearchParams): Promise<IOrderPaginate> {
    const query = this.ormRepository.createQueryBuilder("order");

    // Só faz os JOINs se 'full' for verdadeiro
    if (full) {
      query.leftJoinAndSelect("order.customer", "customer");
      query.leftJoinAndSelect("order.order_products", "order_products");
    }

    const [orders, count] = await query.skip(skip).take(take).getManyAndCount();

    return {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };
  }

  public async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}

export default OrdersRepository;
