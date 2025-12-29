import { Router } from "express";
import { createUserSchema } from "../schemas/UserSchemas";
import AuthMiddleware from "@shared/middlewares/authMiddleware";
import UsersController from "../controllers/UserController";

const usersRouter = Router();
const usersControllers = new UsersController();

usersRouter.get("/", AuthMiddleware.execute, usersControllers.index);
usersRouter.post("/", createUserSchema, usersControllers.create);

export default usersRouter;
