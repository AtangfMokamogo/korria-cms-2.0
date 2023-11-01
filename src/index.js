import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './types/schema.js';
import { resolvers } from './resolvers/resolvers.js';
import { dbConnect } from './utils/mongoDB.js';

dbConnect();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
  context: async ({ req, res }) => {
    const token = req.headers.authorization || 'If this prints you are fine, there s no token since you didnt provide it but it works';
    console.log(token);
    return { token }
  },
});

console.log(`🚀  Server ready at: ${url}`);
