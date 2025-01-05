import { createPubSub } from "@graphql-yoga/subscription";
import { Users } from "../entities/Users";

export const pubSub = createPubSub<{
  NEW_USER_ADDED: [Users];
}>();
