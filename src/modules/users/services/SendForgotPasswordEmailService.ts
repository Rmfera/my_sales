import AppError from "@shared/errors/AppErrors";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { userTokensRepositories } from "../database/repositories/UserTokensRepositories";

interface IForgotPassword {
  email: string;
}

export default class SendForgotPasswordEmailService {
  async execute({ email }: IForgotPassword): Promise<void> {
    const user = await usersRepositories.findByEmail(email);

    if (!user) {
      throw new AppError("User not found.", 409);
    }

    const token = await userTokensRepositories.generate(user.id);

    console.log(token);
  }
}
