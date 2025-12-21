import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import {
  ICustomersRepository,
  Pagination,
} from "@modules/customers/domain/repositories/ICustomersRepositories";
import { Repository } from "typeorm";
import { Customer } from "../entities/Customer";

// Observe que o AppDataSource vem lá do arquivo data-source e este arquivo que faz conexão com o banco de dados
import { AppDataSource } from "@shared/infra/typeorm/data-source";

export default class customerRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Customer);
  }

  async findByName(name: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({
      name,
    });

    return customer;
  }

  async findById(id: number): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({
      id,
    });

    return customer;
  }

  async findByEmail(email: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({
      email,
    });

    return customer;
  }

  async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  async save(customer: ICustomer): Promise<ICustomer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);

    return;
  }

  async findAndCount({
    take,
    skip,
  }: Pagination): Promise<[ICustomer[], number]> {
    const [customers, total] = await this.ormRepository.findAndCount({
      take,
      skip,
    });

    return [customers, total];
  }
}

// import { AppDataSource } from "@shared/infra/typeorm/data-source";
// import { Customer } from "../entities/Customer";

// export const customerRepository = AppDataSource.getRepository(Customer).extend(
//   {
//     async findByName(name: string): Promise<Customer | null> {
//       const customer = await this.findOneBy({ name });
//       return customer;
//     },

//     async findById(id: number): Promise<Customer | null> {
//       const customer = await this.findOneBy({
//         id,
//       });
//       return customer;
//     },

//     async findByEmail(email: string): Promise<Customer | null> {
//       const customer = await this.findOneBy({ email });
//       return customer;
//     },
//   },
// );
