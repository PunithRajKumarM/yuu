import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'http://localhost:8000/api/graphql/list',
  cache: new InMemoryCache(),
});
