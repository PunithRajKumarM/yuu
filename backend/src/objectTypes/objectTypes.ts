import { Field, ObjectType } from "type-graphql";
import { Users } from "../entities/Users";

// objectTypes
@ObjectType()
export class SaveUserResponse {
  @Field()
  message: string;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  message: string;

  @Field()
  accessToken: string;
  @Field()
  refreshToken: string;

  @Field()
  data: Users;
}

@ObjectType()
export class DefaultResponse {
  @Field()
  message: string;
}

@ObjectType()
export class GetUserResponse {
  @Field()
  message: string;

  @Field(() => Users)
  user: Users;
}
