import AppError from "@shared/errors/AppErrors";
import FakeCustomersRepository from "../domain/repositories/fakes/FakeCustomerRepositories";
import CreateCustomerService from "./CreateCustomerService";

describe("CreateCustomerService", () => {
  it("Should be able to create a new customer", async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

    const customer = await createCustomer.execute({
      name: "John Doe",
      email: "john@gmail.com",
    });

    expect(customer).toHaveProperty("id");
    expect(customer.email).toBe("john@gmail.com");
  });

  it("Should not be able to create a new customer with email that is already in use", async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

    await createCustomer.execute({
      name: "John Doe",
      email: "john@gmail.com",
    });

  await expect(
    createCustomer.execute({
      name: "John Doe",
      email: "john@gmail.com",
    }),
  ).rejects.toBeInstanceOf(AppError)
  });

});
