import { Task } from "./generated";

export interface TaskContext {
  dataSources: {
    tasks: Task[];
  };
}