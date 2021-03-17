import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Db, MongoClient } from 'mongodb';
import { readFileSync } from 'fs';
const expressPlayground = require('graphql-playground-middleware-express').default;
import resolvers from './resolvers';

require('dotenv').config();
const typeDefs = readFileSync('./typeDefs.graphql', { encoding: 'utf-8' });

async function start() {
  const app = express();
  const MONGO_DB: string = process.env.DB_HOST!;
  let db: Db;

  try {
    const client = await MongoClient.connect(MONGO_DB, { useNewUrlParser: true });
    db = client.db();
  } catch (error) {
    console.log(`

      Mongo DB Host not found!
      please add DB_HOST environment variable to .env file

      exiting...

    `);
    process.exit(1);
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const githubToken = req.headers.authorization;
      const currentUser = await db.collection('users').findOne({ githubToken });
      return { db, currentUser };
    }
  });

  server.applyMiddleware({ app });

  app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

  app.get('/', (req, res) => {
    let url = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user`;
    res.end(`<a href="${url}">Sign In with Github</a>`);
  });

  app.listen({ port: 4000 }, () =>
    console.log(`GraphQL Server running at http://localhost:4000${server.graphqlPath}`)
  );
}

start();
