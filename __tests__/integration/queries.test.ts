import { ApolloServer } from "@apollo/server";
import { resolvers } from "../../src/resolvers";
import { loadSchema } from "../../src/utils/loadSchema";
import { mockTasks } from "../mockTasks";
import { TaskContext } from "../../src/types/TaskContext";
import { Task } from "../../src/types/generated";
import { queries } from "../testQueries";

// basic integration tests for query resolvers 
// without edge cases testing

describe('Queries', () => {
  let server;
  let tasks;
  const typeDefs = loadSchema();
  const contextValue: TaskContext = {
    dataSources: { 
      get tasks() {
        return tasks; 
      },
    },
  };

  beforeAll(() => {
    tasks = [];
    server = new ApolloServer<TaskContext>({
      typeDefs,
      resolvers,
    });
  });

  beforeEach(() => {
    tasks.length = 0;
  });

  afterAll(() => {
    tasks.length = 0;
  });

  const executeGraphQL = async (
    query: string, 
    variables: Record<string, any>
  ) => {
    const response = await server.executeOperation(
      { query, variables },
      { contextValue }
    );
    const { data, errors } = response.body.singleResult;
    return { data, errors };
  };

  it('fetches all tasks', async () => {
    tasks.push(...mockTasks);

    const query = queries.GetAllTasks;

    const { data, errors } = await executeGraphQL(query, {});

    expect(data.tasks.taskList).toHaveLength(4);
    expect(data.tasks.taskList[0]).toEqual(mockTasks[0]);
    expect(errors).toBeUndefined();
  });

  it('fetches paginated tasks', async () => {
    tasks.push(...mockTasks);

    const query = queries.GetPaginatedTasks;
    const variables = {
      input: {
        pagination: {
          page: 1,
          limit: 2,
        }
      }
    };

    const { data, errors } = await executeGraphQL(query, variables);

    expect(tasks).toHaveLength(4);
    expect(data.tasks.taskList).toHaveLength(2);
    expect(data.tasks.metadata).toEqual({
      page: 1,
      limit: 2,
      total: tasks.length,
      hasNextPage: true,
      hasPreviousPage: false,
    });
    expect(errors).toBeUndefined();
  });

  it('fetches filtered tasks', async () => {
    tasks.push(...mockTasks);

    const query = queries.GetFilteredTasks;
    const variables = {
      input: {
        query: {
          completed: false,
        }
      }
    };

    const { data, errors } = await executeGraphQL(query, variables);

    expect(tasks).toHaveLength(4);
    expect(data.tasks.taskList).toHaveLength(2);
    expect(data.tasks.taskList
      .every((task: Task) => task.completed === false))
      .toBe(true);
    expect(errors).toBeUndefined();
  });

  it('fetches a task by ID', async () => {
    tasks.push(...mockTasks);

    const query = queries.GetTask;

    const variables = { id: mockTasks[0].id };

    const { data, errors } = await executeGraphQL(query, variables);

    expect(data.task).toEqual(mockTasks[0]);
    expect(errors).toBeUndefined();
  });
});