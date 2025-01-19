import { buildSchema } from "type-graphql";
import { PostResolver } from "../resolvers/PostResolver";
import { UserRelationshipResolver } from "../resolvers/UserRelationshipsResolver";
import { UsersResolver } from "../resolvers/UsersResolver";
import { pubSub } from "../subscription/pubSub";
import { CommentsResolver } from "../resolvers/CommentsResolver";

export const schemaData = async () => {
  const schema = await buildSchema({
    resolvers: [
      UsersResolver,
      PostResolver,
      UserRelationshipResolver,
      CommentsResolver,
    ],
    pubSub,
  });
  return schema;
};
