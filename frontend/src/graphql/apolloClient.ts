import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_URL + "/graphql", // Thay bằng URL GraphQL của bạn
  cache: new InMemoryCache(),
});

export default client;
