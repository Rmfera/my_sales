import { AppDataSource } from "@shared/typeorm/data-source";
import { Order } from "../entities/Order";
import { Customer } from "@modules/customers/database/entities/Customer";
import { OrdersProducts } from "../entities/OrdersProducts";

interface ICreateOrder {
  customer: Customer;
  products: OrdersProducts[];
}

export const orderRepositories = AppDataSource.getRepository(Order).extend({
  async findById(id: number): Promise<Order | null> {
    // O professor usou findOne ao invés de findByOne(), porque ele consegue usar um objeto com 2 ou mais parâmetros, no caso
    const order = await this.findOne({
      where: { id },
      relations: ["order_products", "customer"],
    });

    return order;
  },

  async createOrder({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);
    return order;
  },
});
