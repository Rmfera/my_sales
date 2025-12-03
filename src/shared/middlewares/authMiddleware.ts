import AppError from "@shared/errors/AppErrors";
import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default class AuthMiddleware {
  static execute(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT Token is missing.", 401);
    }
    // Esta função abaixo é para separar o Bearear do token propriamente dito
    const [, token] = authHeader.split(" ");
    try {
      const decodedToken = verify(token, process.env.APP_SECRET as Secret);
      const { sub } = decodedToken as ITokenPayload;
      request.user = { id: sub };
      return next();
    } catch (error) {
      throw new AppError("Invalid JWT Token.", 401);
    }
  }
}
