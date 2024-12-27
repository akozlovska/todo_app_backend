export const queries = {
  GetAllTasks: `
    query GetAllTasks {
      tasks {
        taskList {
          id
          title
          description
          completed
          dueDate
        }
      }
    }
  `,
  GetPaginatedTasks: `
    query GetPaginatedTasks($input: TasksInput) {
      tasks(input: $input) {
        taskList {
          id
          title
          description
          completed
          dueDate
        }
        metadata {
          page
          limit
          hasNextPage
          hasPreviousPage
          total
        }
      }
    }
  `,
  GetFilteredTasks: `
    query GetFilteredTasks($input: TasksInput) {
      tasks(input: $input) {
        taskList {
          id
          title
          description
          completed
          dueDate
        }
      }
    }
  `,
  GetTask: `
    query GetTask($id: ID!) {
      task(id: $id) {
        id
        title
        description
        completed
        dueDate
      }
    }
  `,
  CreateTask: `
    mutation CreateTask($input: TaskInput!) {
      createTask(input: $input) {
        id
        completed
        title
        description
        dueDate
      }
    }
  `,
  UpdateTask: `
    mutation UpdateTask($id: ID!, $input: TaskInput!) {
      updateTask(id: $id, input: $input) {
        id
        completed
        title
        description
        dueDate
      }
    }
  `,
  DeleteTask: `
    mutation DeleteTask($id: ID!) {
      deleteTask(id: $id)
    }
  `,
  CompleteAllTasks: `
    mutation CompleteAllTasks {
      completeAllTasks {
        completed
      }
    }
  `,
};