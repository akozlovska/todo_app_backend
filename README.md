# Todo App (Backend)

A simple GraphQL server for tasks management.

---

## Technologies Used

- **GraphQL**
- **GraphQL Code Generator**
- **Apollo Server**
- **TypeScript**
- **Jest**

---

## Features

- Create, update, delete, and fetch tasks.
- Pagination and optional filtering for tasks query.
- Basic integration tests for queries and mutations resolvers.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/akozlovska/todo_app_backend.git
cd todo_app_backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Generate TypeScript Types
Run the following command to generate TypeScript types from your GraphQL schema:
```bash
npm run generate
```

### 4. Start the Server
Start the development server using:
```bash
npm run start
```
The server will be running at [http://localhost:4000](http://localhost:4000).

### 5. Run Tests
Run the tests with:
```bash
npm run test
```

---

## Testing Your API

You can interact with your GraphQL API using the Apollo Sandbox.

1. Navigate to [http://localhost:4000](http://localhost:4000) in your browser.
2. Use the query examples below to interact with the API.

---

## Documentation

### Queries

#### `tasks`
Fetch a list of tasks with optional pagination and filtering.

```graphql
query GetTasks($input: TasksInput) {
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
```

#### `task`
Fetch a single task by ID.

```graphql
query GetTask($id: ID!) {
  task(id: $id) {
    id
    title
    description
    completed
    dueDate
  }
}
```

### Mutations

#### `createTask`
Create a new task.

```graphql
mutation CreateTask($input: TaskInput!) {
  createTask(input: $input) {
    id
    completed
    title
    description
    dueDate
  }
}
```

#### `updateTask`
Update an existing task by ID.

```graphql
mutation UpdateTask($id: ID!, $input: TaskInput!) {
  updateTask(id: $id, input: $input) {
    id
    completed
    title
    description
    dueDate
  }
}
```

#### `deleteTask`
Delete a task by ID.

```graphql
mutation DeleteTask($id: ID!) {
  deleteTask(id: $id)
}
```

#### `completeAllTasks`
Mark all tasks as completed.

```graphql
mutation CompleteAllTasks {
  completeAllTasks {
    id
    completed
    title
    description
    dueDate
  }
}
```


