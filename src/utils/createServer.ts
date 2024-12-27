import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from '../resolvers';
import { loadSchema } from './loadSchema';
import { tasks } from '../store';
import { TaskContext } from '../types/TaskContext';

// TaskContext with dataSource referring to in-memory array is implemented
// as it makes storage management centralized, without multiple imports

export async function createServer({ port }: { port: number }) {
  const typeDefs = loadSchema();
  const server = new ApolloServer<TaskContext>({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port },
    context: async(): Promise<TaskContext> => ({
      dataSources: { tasks },
    }),
  });

  return { server, url };
}


