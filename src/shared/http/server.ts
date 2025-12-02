import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import { errors } from "celebrate";

// Como é o arquivo index que possui routes não é necessário colocar "./routes/index.ts"
import routes from "./routes";
import ErrorHandleMiddleware from "@shared/middlewares/ErrorHandleMiddleware";
import { AppDataSource } from "@shared/typeorm/data-source";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(routes);
    app.use(errors());
    app.use(ErrorHandleMiddleware.handleError);
    console.log("Connect to the database! 🏆");
    app.listen(3333, () => {
      console.log("Server started on port 3333! 🏆");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
