import { buildSchema } from "type-graphql";
import { UsersResolver } from "../resolvers/UsersResolver";
import { PostResolver } from "../resolvers/PostResolver";

export const schemaData = async () => {
  const schema = await buildSchema({
    resolvers: [UsersResolver, PostResolver],
  });
  return schema;
};
