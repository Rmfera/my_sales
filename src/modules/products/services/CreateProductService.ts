import AppError from "@shared/errors/AppErrors";
import { productsRepositories } from "../database/repositories/ProductsRepositories";
import { Product } from "../database/entities/Product";
import RedisCache from "@shared/cache/RedisCache";

interface ICreateProduct {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {
    const redisCache = new RedisCache();
    const productsExists = await productsRepositories.findByName(name);
    if (productsExists) {
      // O 409 é um status code que significa conflito no meu banco de dados
      throw new AppError("There is already one product with this name", 409);
    }

    // O professor disse que não precisa de await neste método, porque está só criando este objeto
    // Este método cria o objeto a ser mapeado/enviado para o banco de dados
    const product = productsRepositories.create({
      name,
      price,
      quantity,
    });

    // Este método salva o objeto no banco de dados, tem o await, pois precisa aguardar a resposta do banco de dados
    await productsRepositories.save(product);

    await redisCache.invalidate("api-mysales-PRODUCT_LIST");

    return product;
  }
}
