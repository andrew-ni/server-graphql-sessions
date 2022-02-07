import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import * as session from 'express-session';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const startServer = async (port: number) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: any) => ({ req }),
  });

  await createConnection();

  const app = express();
  app.set('trust proxy', process.env.NODE_ENV !== 'production');
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: 'asdfasdfasdfasdf',
      cookie: {
        sameSite: 'none',
        secure: true,
      },
    })
  );

  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: 'https://studio.apollographql.com',
    },
  });

  app.listen({ port: port }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer(4000);
