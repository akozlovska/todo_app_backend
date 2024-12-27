import { ApolloServer } from "@apollo/server";
import { resolvers } from "../../src/resolvers";
import { loadSchema } from "../../src/utils/loadSchema";
import { mockTasks } from "../mockTasks";
import { TaskContext } from "../../src/types/TaskContext";
import { queries } from "../testQueries";

// basic integration tests for mutation resolvers 
// without edge cases testing

describe('Mutations', () => {
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

  it('creates new task', async () => {
    const { id, completed, ...taskInput } = mockTasks[0];

    const query = queries.CreateTask;
    const variables = { input: taskInput };

    const { data, errors } = await executeGraphQL(query, variables);

    expect(data.createTask.id).toBeDefined();
    expect(data.createTask).toMatchObject({
      title: mockTasks[0].title,
      description: mockTasks[0].description,
      dueDate: mockTasks[0].dueDate,
      completed: false,
    });
    expect(errors).toBeUndefined();
  });

  it('updates a task by ID', async () => {
    tasks.push(mockTasks[0]);

    const query = queries.UpdateTask;

    const variables = { 
      id: mockTasks[0].id,
      input: {
        title: mockTasks[0].title,
        description: mockTasks[0].description,
        dueDate: mockTasks[0].dueDate,
        completed: true,
      }
    };

    const { data, errors } = await executeGraphQL(query, variables);

    expect(data.updateTask.completed).toEqual(true);
    expect(data.updateTask).toMatchObject({
      id: mockTasks[0].id,
      title: mockTasks[0].title,
      description: mockTasks[0].description,
      dueDate: mockTasks[0].dueDate,
    });;
    expect(errors).toBeUndefined();
  });

  it('deletes a task by ID', async () => {
    tasks.push(mockTasks[0]);

    const query = queries.DeleteTask;
    const variables = { 
      id: mockTasks[0].id,
    };

    const { data, errors } = await executeGraphQL(query, variables);

    expect(tasks).toHaveLength(0);
    expect(data.deleteTask).toEqual('Task deleted successfully');
    expect(errors).toBeUndefined();
  });

  it('completes all tasks', async () => {
    tasks.push(...mockTasks);

    const query = queries.CompleteAllTasks;

    const { data, errors } = await executeGraphQL(query, {});

    expect(data.completeAllTasks).toHaveLength(4);
    expect(data.completeAllTasks
      .every(task => task.completed === true))
      .toBe(true);
    expect(errors).toBeUndefined();
  });
});