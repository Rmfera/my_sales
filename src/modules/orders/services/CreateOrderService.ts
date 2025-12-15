import { Product } from "@modules/products/database/entities/Product";
import { Order } from "../database/entities/Order";
import { customerRepository } from "@modules/customers/database/repositories/CustomerRepositories";
import AppError from "@shared/errors/AppErrors";
import { productsRepositories } from "@modules/products/database/repositories/ProductsRepositories";
import { orderRepositories } from "../database/repositories/OrderRepositories";

interface ICreateOrder {
  customer_id: string;
  products: Product[];
}

export class CreateOrderService {
  async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
    const customerExists = await customerRepository.findById(
      Number(customer_id),
    );

    if (!customerExists) {
      throw new AppError("Could not find any customer with the given id.");
    }

    const existsProducts = await productsRepositories.findAllByIds(products);
    if (!existsProducts.length) {
      throw new AppError("Could not find any products with the given ids.");
    }

    const existsProductsIds = products.map((product) => product.id);

    const checkInexistentProducts = products.filter(
      (product) => !existsProductsIds.includes(product.id),
    );

    // Por causa de uma exclamação antes da condição abaixo tinha dado erro no teste da minha rota de orders no POSTMAN
    // Ou seja, eu tinha colocado assim: if (!checkInexistentProducts.length)
    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
        404,
      );
    }

    const quantityAvailable = products.filter((product) => {
      existsProducts.filter(
        (productExisten) => productExisten.id === product.id,
      )[0].quantity < product.quantity;
    });

    if (quantityAvailable.length) {
      throw new AppError(`The quantity is not available.`, 409);
    }

    const serializedProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter((p) => p.id === product.id)[0].price,
    }));

    const order = await orderRepositories.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    // Observe abaixo que o map tem um objeto com id e quantity, por isso tem as chaves
    const updateProductQuantity = order_products.map((product) => ({
      id: product.product_id,
      quantity:
        existsProducts.filter((p) => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepositories.save(updateProductQuantity);

    return order;
  }
}
