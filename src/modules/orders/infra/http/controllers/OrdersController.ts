import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ListOrderService from '@modules/orders/services/ListOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class OrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    // 1. Capturamos o 'full' da query string
    const { page, limit, full } = request.query;

    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 15;

    const listOrders = container.resolve(ListOrderService);

    // 2. Passamos o 'full' convertido para booleano (true se a string for "true")
    const orders = await listOrders.execute({
      page: pageNumber,
      limit: limitNumber,
      full: full === 'true'
    });

    return response.json(orders);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return response.json(order);
  }
}
