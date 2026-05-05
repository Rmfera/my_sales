import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import ListUserService from "@modules/users/services/ListUserService";
import CreateUserService from "@modules/users/services/CreateUserService";
import { container } from "tsyringe";

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, skip, take } = request.query;

    const listUser = container.resolve(ListUserService);

    // Usamos o operador OR (||) para garantir um valor padrão se for undefined/NaN
    const users = await listUser.execute({
      page: page ? Number(page) : 1,
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 10, // Defini 10 como padrão, ajuste se preferir
    });

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}
