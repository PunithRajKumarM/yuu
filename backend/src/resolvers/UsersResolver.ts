import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { AppDataSource } from "../config/data-source";
import { ErrorsList } from "../constant/ErrorsList";
import { Users } from "../entities/Users";
import { UserToken } from "../entities/UserToken";
import { generateAccessRefreshToken } from "../helper/generateAccessRefreshToken";
import { LoginInputType, UserInputType } from "../inputTypes/inputTypes";
import {
  DefaultResponse,
  DefaultUserResponse,
  GetUserResponse,
} from "../objectTypes/objectTypes";
import { pubSub } from "../subscription/pubSub";
import { uploadToCloudinary } from "../helper/uploadToCloudinary";
const bcrypt = require("bcrypt");

const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUDINARY_BASE_URL = process.env.CLOUDINARY_BASE_URL;
const CLOUDINARY_IMAGE_PATH = process.env.CLOUDINARY_IMAGE_PATH;

// user resolver
@Resolver()
export class UsersResolver {
  // save user
  @Mutation(() => DefaultUserResponse)
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

      // pubSub.publish("NEW_USER_ADDED", savedUser);

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

  @Subscription(() => Users, {
    topics: "NEW_USER_ADDED",
  })
  async new_user_added(@Root() users: Users) {
    return users;
  }

  @Mutation(() => DefaultUserResponse)
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
      };
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => DefaultResponse)
  // logout
  async logout(@Arg("id") id: string) {
    const userRepository = AppDataSource.getRepository(Users);
    try {
      const existingUser = await userRepository.findOneBy({ id });
      if (!existingUser) throw new Error(ErrorsList.USER_DOES_NOT_EXIST);

      // await AppDataSource.transaction(async (transactionManager) => {
      //   const userTokenRepository = transactionManager.getRepository(UserToken);
      //   const userToken = await userTokenRepository.findOneBy({
      //     user: { id },
      //   });
      //   if (!userToken) throw new Error("No token found");

      //   await userTokenRepository.delete(userToken.id);
      //   await userRepository.update({ id }, { isOnline: false });
      // });
      return { message: "Logout successfully!" };
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => DefaultResponse)
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
      return { message: "Password changed successfully!" };
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

  @Query(() => [Users])
  async get_users() {
    const userRepository = AppDataSource.getRepository(Users);
    try {
      if (!userRepository) throw new Error("No user table");
      const users = await userRepository.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => DefaultResponse)
  async add_profile_picture(
    @Arg("id") id: string,
    @Arg("image") image: string
  ) {
    const userRepository = AppDataSource.getRepository(Users);
    const user = await userRepository.findOneBy({ id });
    try {
      if (!user) throw new Error(ErrorsList.USER_NOT_FOUND);
      const cloudinaryUrl = await uploadToCloudinary(image);
      const link = cloudinaryUrl.split("/upload/")[1];

      await userRepository.update({ id }, { profilePicture: link });
      return { message: "Profile picture set successfully!" };
    } catch (error) {
      throw error;
    }
  }
}
