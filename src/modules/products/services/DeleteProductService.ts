import RedisCache from "@shared/cache/RedisCache";
import { productsRepositories } from "../infra/database/repositories/ProductsRepositories";
import AppError from "@shared/errors/AppErrors";


interface IDeleteProduct {
  id: string;
}

export default class DeleteProductService {
  async execute({ id }: IDeleteProduct): Promise<void> {
    const redisCache = new RedisCache();
    const product = await productsRepositories.findById(id);

    if (!product) {
      throw new AppError("Product not found.", 404);
    }

    await redisCache.invalidate("api-mysales-PRODUCT_LIST");

    await productsRepositories.remove(product);
  }
}
