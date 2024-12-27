import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "../config/data-source";
import { ErrorsList } from "../constant/ErrorsList";
import { Users } from "../entities/Users";
import { generateAccessRefreshToken } from "../helper/generateAccessRefreshToken";
import { LoginInputType, UserInputType } from "../inputTypes/inputTypes";
import {
  GetUserResponse,
  LoginResponse,
  ResetPasswordResponse,
  SaveUserResponse,
} from "../objectTypes/objectTypes";
const bcrypt = require("bcrypt");

// user resolver
@Resolver()
export class UsersResolver {
  // save user
  @Mutation(() => SaveUserResponse)
  async save_user(@Arg("user") user: UserInputType) {
    const { email, password, userName, fullName } = user;
    const userRepository = AppDataSource.getRepository(Users);
    try {
      const existingUserEmail = await userRepository.findOneBy({
        email,
      });

      if (existingUserEmail) {
        throw new Error(ErrorsList.EXISTING_USER);
      }
      const existingUserName = await userRepository.findOneBy({
        userName,
      });
      if (existingUserName) {
        throw new Error(ErrorsList.USER_NAME_ALREADY_TAKEN);
      }

      let savedUser!: Users;
      await AppDataSource.transaction(async (transactionManager) => {
        const newUser = new Users();
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.email = email;
        newUser.userName = userName;
        newUser.fullName = fullName;
        newUser.password = hashedPassword;
        newUser.isOnline = true;

        savedUser = await transactionManager.save(newUser);
      });
      if (!savedUser) throw new Error(ErrorsList.FAILED_SAVING_USER);

      const { accessToken, refreshToken } = await generateAccessRefreshToken(
        savedUser.id
      );
      return {
        message: `Hey ${user.userName}, welcome to Yuu! We're excited to have you here!`,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  @Query(() => LoginResponse)
  // login user
  async login(@Arg("login") login: LoginInputType) {
    const { email, password } = login;
    const userRepository = AppDataSource.getRepository(Users);
    try {
      const existingUser = await userRepository.findOneBy({ email });

      if (!existingUser) throw new Error(ErrorsList.USER_DOES_NOT_EXIST);
      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!validPassword) throw new Error(ErrorsList.INCORRECT_PASSWORD);

      const { accessToken, refreshToken } = await generateAccessRefreshToken(
        existingUser.id
      );

      return {
        message: "Logged in",
        accessToken,
        refreshToken,
        data: existingUser,
      };
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => ResetPasswordResponse)
  // reset password
  async reset_password(@Arg("data") data: LoginInputType) {
    const { email, password } = data;
    const userRepository = AppDataSource.getRepository(Users);
    try {
      const existingUser = await userRepository.findOneBy({ email });
      if (!existingUser) throw new Error(ErrorsList.USER_DOES_NOT_EXIST);
      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (validPassword) throw new Error(ErrorsList.CURRENT_PASSWORD);
      const hashedPassword = await bcrypt.hash(password, 10);
      await userRepository.update(
        { email },
        {
          password: hashedPassword,
        }
      );
      return {
        message: "Password changed successfully!",
      };
    } catch (error) {
      throw error;
    }
  }

  @Query(() => GetUserResponse)
  async get_user(@Arg("id") id: string) {
    const userRepository = AppDataSource.getRepository(Users);
    const user = await userRepository.findOneBy({ id });
    if (!user) throw new Error(ErrorsList.USER_NOT_FOUND);
    return {
      message: "User fetched successfully!",
      user,
    };
  }
}
