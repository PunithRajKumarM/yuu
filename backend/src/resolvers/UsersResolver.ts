import { Query, Resolver } from "type-graphql";
import { AppDataSource } from "../config/data-source";
import { Users } from "../entities/User";
import { UsersResponse } from "../objectTypes/objectTypes";

@Resolver()
export class UsersResolver {
  @Query(() => UsersResponse)
  async get_users() {
    const userRepository = AppDataSource.getRepository(Users);
    const users = await userRepository.find();
    if (users.length > 0)
      return { data: users, message: "Users data fetched successfully" };
    return {
      data: null,
      message: "No user found",
    };
  }
}
