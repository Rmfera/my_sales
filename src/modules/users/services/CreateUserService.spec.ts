/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { hash } from "bcrypt";
import FakeUserRepository from "../domain/repositories/fakes/FakeUserRepositories";
import CreateUserService from "./CreateUserService";
import ListUserService from "./ListUserService";
import 'reflect-metadata';
import AppError from "@shared/errors/AppErrors";

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

let fakeUserRepository: FakeUserRepository;
let createUserService: CreateUserService;
let listUserService: ListUserService;

describe("Users Module Services", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUserService = new CreateUserService(fakeUserRepository);
    listUserService = new ListUserService(fakeUserRepository);
  });

  describe("CreateUserService", () => {
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

    it('should not be able to create a user with an existing email', async () => {
      await createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      });

      await expect(
        createUserService.execute({
          name: 'Jane Doe',
          email: 'johndoe@example.com',
          password: '654321',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });

    it('should hash the password before saving the user', async () => {
      const hashSpy = jest
        .spyOn(require('bcrypt'), 'hash')
        .mockResolvedValue('hashed-password');

      await createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      });

      expect(hashSpy).toHaveBeenCalledWith('123456', 8);
    });
  });

  describe("ListUserService", () => {
    it("should be able to list users with pagination structure", async () => {
      await fakeUserRepository.create({
        name: "Test List",
        email: "list@example.com",
        password: "password",
      });

      // CORREÇÃO DEFINITIVA: Usando os nomes da interface SearchParams
      // Como o Service espera skip e take, passamos eles aqui
      const users = await listUserService.execute({
        page: 1,
        skip: 0,
        take: 10,
      });

      expect(users).toHaveProperty("data");
      expect(users).toHaveProperty("total");
      expect(users).toHaveProperty("per_page"); // O Service deve mapear 'take' para 'per_page'
      expect(Array.isArray(users.data)).toBe(true);
    });
  });
});
