import { Field, ObjectType } from "type-graphql";
import { Users } from "../entities/User";

@ObjectType()
export class UsersResponse {
  @Field(() => [Users], { nullable: true })
  data: Users[] | null;

  @Field(() => String)
  message: string;
}
