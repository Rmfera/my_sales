import { Router } from "express";
import UpdateAvatarControllers from "../controllers/UpdateAvatarControllers";
import multer from "multer";
import uploadConfig from "@config/upload";
import AuthMiddleware from "@shared/middlewares/authMiddleware";

const avatarRouter = Router();
const userAvatarController = new UpdateAvatarControllers();
const upload = multer(uploadConfig);

// Observe abaixo esta parte: upload.single('avatar'), será o arquivo que vamos fazer o upload, no caso um único arquivo
avatarRouter.patch(
  "/",
  AuthMiddleware.execute,
  upload.single("avatar"),
  userAvatarController.update,
);

export default avatarRouter;
