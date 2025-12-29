/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { hash } from "bcrypt";
import FakeUserRepository from "../domain/repositories/fakes/FakeUserRepositories";
import CreateUserService from "./CreateUserService";
import 'reflect-metadata';

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

let fakeUserRepository: FakeUserRepository;
let createUserService: CreateUserService;
describe("CreateUserService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUserService = new CreateUserService(fakeUserRepository);
  });

  it("should be able to create a new user", async () => {
    (hash as jest.Mock).mockReturnValue("hashed-password");

    const user = await createUserService.execute({
      name: "Jonh Doe",
      email: "johndoe@example.com",
      password: "123456",
    });
    expect(user).toHaveProperty("id");
    expect(user.email).toBe("johndoe@example.com");
  });
  // it("should not be able to create a user with an existing email", async () => {});
  // it("should hash the password before saving the user", async () => {});
});
