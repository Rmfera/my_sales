import { CreateOrderService } from "@modules/orders/services/CreateOrderService";
import { ShowOrderService } from "@modules/orders/services/ShowOrderService";
import { Request, Response } from "express";


export default class OrdersController {
  async show(request: Request, response: Response): Promise<Response> {
    // Segundo o professor a linha a seguir também poderia ser assim: const id = request.params.id
    const { id } = request.params;

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute(id);

    return response.json(order);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;
    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({
      customer_id,
      products,
    });
    return response.json(order);
  }
}
