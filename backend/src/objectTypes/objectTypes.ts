import { Field, ObjectType } from "type-graphql";
import { Users } from "../entities/Users";
import { Posts } from "../entities/Posts";
import { UserRelationships } from "../entities/UserRelationship";

// objectTypes
@ObjectType()
export class DefaultUserResponse {
  @Field(() => String)
  message: string;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
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

@ObjectType()
export class GetUsersPostsResponse {
  @Field(() => [Users])
  users: Users[];
}

@ObjectType()
export class GetUserRelationshipsResponse {
  @Field(() => [UserRelationships])
  followers: UserRelationships[];
  @Field(() => [UserRelationships])
  followings: UserRelationships[];
}
