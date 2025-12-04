import productsRouter from "@modules/products/routes/ProductRoutes";
import avatarRouter from "@modules/users/routes/AvatarRoutes";
import sessionsRouter from "@modules/users/routes/SessionsRoutes";
import usersRouter from "@modules/users/routes/UserRoutes";
import express, { Router } from "express";
import uploadConfig from "@config/upload";

const routes = Router();

routes.get("/health", (request, response) => {
  return response.json({ message: "Hello Dev! I am Alive!" });
});
routes.use("/products", productsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/avatar", avatarRouter);

// Segundo o professor esta rota abaixo é uma rota stática. Se o servidor estiver rodando evocê for no navegador
// e digitar: http://localhost:3333/files/4cf0bee5830dcbe78605-avatar.png vai aparecer a imagem que está em uploads
routes.use("/files", express.static(uploadConfig.directory));

export default routes;
