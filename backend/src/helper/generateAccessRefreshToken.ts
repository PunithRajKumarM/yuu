import jwt from "jsonwebtoken";
import { UserToken } from "../entities/UserToken";
import { AppDataSource } from "../config/data-source";
import { Users } from "../entities/Users";
import { ErrorsList } from "../constant/ErrorsList";

export const generateAccessRefreshToken = async (id: string) => {
  try {
    const accessToken = jwt.sign({ id }, "your-secret-key", {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id }, "your-secret-key", {
      expiresIn: "7d",
    });
    await AppDataSource.transaction(async (transactionManager) => {
      const userToken = new UserToken();
      userToken.refreshToken = refreshToken;
      const userRepository = transactionManager.getRepository(Users);
      const user = await userRepository.findOneBy({ id });
      if (!user) throw new Error(ErrorsList.USER_NOT_FOUND);

      userToken.user = user;
      const userTokenRepository = transactionManager.getRepository(UserToken);
      await userTokenRepository.save(userToken);
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};
