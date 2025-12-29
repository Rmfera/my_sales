import { Router } from "express";
import { UpdateUserSchema } from "../schemas/UpdateUserSchemas";
import AuthMiddleware from "@shared/middlewares/authMiddleware";
import ProfileController from "../controllers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(AuthMiddleware.execute);
profileRouter.get("/", profileController.show);
profileRouter.patch("/", UpdateUserSchema, profileController.update);

export default profileRouter;
