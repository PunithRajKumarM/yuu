import { Field, InputType, ObjectType } from "type-graphql";

// objectTypes
@InputType()
@ObjectType()
export class UserInputType {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  userName: string;
  @Field()
  fullName: string;
}

@InputType()
@ObjectType()
export class LoginInputType {
  @Field()
  email: string;
  @Field()
  password: string;
}
