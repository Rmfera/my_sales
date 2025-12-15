import AppError from "@shared/errors/AppErrors";
import { Order } from "../database/entities/Order";
import { orderRepositories } from "../database/repositories/OrderRepositories";

export class ShowOrderService {
  // O professor disse que não colocou dessa forma abaixo <Order | null>, porque precisamos dar um retorno para o usuário
  async execute(id: string): Promise<Order> {
    const order = await orderRepositories.findById(Number(id));

    if (!order) {
      throw new AppError("Order not found.");
    }

    return order;
  }
}
