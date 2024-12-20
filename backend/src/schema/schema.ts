import { buildSchema } from "type-graphql";
import { UsersResolver } from "../resolvers/UsersResolver";

export const schemaData = async () => {
  const schema = await buildSchema({
    resolvers: [UsersResolver],
  });
  return schema;
};
