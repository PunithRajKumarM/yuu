import { buildSchema } from "type-graphql";
import { PostResolver } from "../resolvers/PostResolver";
import { UserRelationshipResolver } from "../resolvers/userRelationshipsResolver";
import { UsersResolver } from "../resolvers/UsersResolver";
import { pubSub } from "../subscription/pubSub";

export const schemaData = async () => {
  const schema = await buildSchema({
    resolvers: [UsersResolver, PostResolver, UserRelationshipResolver],
    pubSub,
  });
  return schema;
};
