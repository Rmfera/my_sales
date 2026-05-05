/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from "@shared/errors/AppErrors";
import { NextFunction, Request, Response } from "express";

export default class ErrorHandleMiddleware {
  public static handleError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        type: "error",
        message: error.message,
      });
    }

    // ADICIONE ESTA LINHA ABAIXO PARA O ERRO APARECER NO TERMINAL
    console.error("DEBUG - Erro não tratado:", error);

    return res.status(500).json({
      type: "error",
      message: "Internal server error",
    });
  }
}
